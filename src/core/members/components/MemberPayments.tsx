import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableColumnsType, Result, Table, TableProps, Space, App } from 'antd';
import { format, set } from 'date-fns';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { useDisplayGraphQLErrors } from '../../../hooks';
import {
  MemberDetailFragment,
  PaymentFilter,
  PaymentListItemFragment,
  PaymentSortEnum,
  PaymentTypeEnum,
  SortDirectionEnum,
  usePaymentSendReceiptMutation,
  usePaymentsQuery,
} from '../../../generated/graphql';
import PDF from '../../payments/pdfs/receipt-pdf';
import { toCurrency } from '../../../utils';
import { ActionButtons, Filters } from '../../../commons';

const PAGE_SIZE = 10;

interface Props {
  member: MemberDetailFragment;
}

const MemberPayments: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [sendingIds, setSendingIds] = React.useState<string[]>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [searchText, setSearchText] = React.useState('');
  const [filterInfo, setFilterInfo] = React.useState<Record<string, FilterValue | null>>({});
  const [sortInfo, setSortInfo] = React.useState<SorterResult<PaymentListItemFragment>>({ order: 'descend' });

  const queryFilter = React.useMemo(() => {
    let sortBy;
    let sortDirection;

    switch (sortInfo.columnKey) {
      case 'counter':
        sortBy = PaymentSortEnum.COUNTER;
        break;
      case 'month':
        sortBy = PaymentSortEnum.MONTH;
        break;
      default:
        sortBy = PaymentSortEnum.CREATED_AT;
    }
    if (sortBy) {
      sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;
    }

    const result: PaymentFilter = {
      counter: filterInfo?.counter?.length ? (filterInfo.counter[0] as number) : undefined,
      memberIds: [member.id],
      feeIds: filterInfo?.fee?.length ? (filterInfo.fee as string[]) : undefined,
      months: filterInfo?.months?.length
        ? filterInfo.months.map((month) => format(month as number, 'yyyy-MM'))
        : undefined,
      type: filterInfo?.type?.length ? (filterInfo.type[0] as PaymentTypeEnum) : undefined,
      sent: filterInfo?.sent?.length ? filterInfo.sent[0] === 'true' : undefined,
      sortBy,
      sortDirection,
    };
    return result;
  }, [filterInfo, member.id, sortInfo]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = usePaymentsQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
    },
  });

  const [sendEmail, { error: sendError }] = usePaymentSendReceiptMutation({
    refetchQueries: ['Payments', 'Emails', 'Member'],
    onCompleted: () => {
      message.success(t('payments.sent'));
    },
  });

  useDisplayGraphQLErrors(queryError, sendError);

  const payments = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.payments.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const total = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.payments.pageInfo.total;
    }
    return 0;
  }, [queryData, queryError, queryLoading]);

  const handlePrint = (paymentId: string) => {
    PDF.print(paymentId);
  };

  const handleSend = React.useCallback(
    async (paymentId: string) => {
      const attachmentUri = await PDF.print(paymentId, 'data-url');
      if (!attachmentUri) {
        message.error(t('payments.printError'));
        return;
      }

      setSendingIds([...sendingIds, paymentId]);

      sendEmail({
        variables: {
          input: {
            id: paymentId,
            attachmentUri,
          },
        },
      }).finally(() => {
        setSendingIds([...sendingIds]);
      });
    },
    [message, sendEmail, sendingIds, t]
  );

  const columns = React.useMemo(() => {
    const result: TableColumnsType<PaymentListItemFragment> = [
      {
        title: t('payments.table.counter'),
        key: 'counter',
        dataIndex: 'counter',
      },
      {
        title: t('payments.table.course'),
        key: 'course',
        dataIndex: ['fee', 'course', 'name'],
      },
      {
        title: t('payments.table.fee'),
        key: 'fee',
        dataIndex: ['fee', 'name'],
      },
      {
        title: t('payments.table.amount'),
        key: 'amount',
        dataIndex: 'amount',
        align: 'right',
        render: (amount) => toCurrency(amount),
      },
      {
        title: t('payments.table.type'),
        key: 'type',
        dataIndex: 'type',
        render: (type: PaymentListItemFragment['type']) => t(`payments.type.${type}`),
      },
      {
        title: t('payments.table.details'),
        key: 'details',
        render: (_, { month: rawMonth, years }) => {
          if (rawMonth) {
            const [year, month] = rawMonth.split('-').map((value: string) => parseInt(value, 10));

            const str = format(set(Date.now(), { year, month: month - 1 }), 'MMMM yyyy');
            return str.charAt(0).toUpperCase() + str.slice(1);
          }

          if (years) {
            return years.join(' - ');
          }

          return undefined;
        },
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        fixed: 'right',
        render: (id, { sent }) => (
          <ActionButtons
            buttons={['edit', { button: 'print' }, { button: 'send', sent, disabled: sendingIds.includes(id) }]}
            onEdit={() => navigate(`/payments/${id}`)}
            onPrint={() => handlePrint(id)}
            onSend={() => handleSend(id)}
          />
        ),
      },
    ];
    return result;
  }, [handleSend, navigate, sendingIds, t]);

  const handleTableChange: TableProps<PaymentListItemFragment>['onChange'] = (newPagination, _filters, sorter) => {
    setSortInfo(sorter as SorterResult<PaymentListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {queryError && <Result status="500" title="500" subTitle="Sorry, something went wrong." />}

      <Filters
        topFilters={[
          {
            key: 'counter',
            type: 'numeric',
            props: {
              size: 'large',
              placeholder: t('payments.table.counter'),
            },
          },
          {
            key: 'fee',
            type: 'fees',
            props: {
              size: 'large',
              placeholder: t('payments.form.fee'),
              queryFilters: {
                courseIds: member.courses.map(({ id }) => id),
              },
              showCourse: member.courses.length > 1,
            },
          },
        ]}
        collapsableFilters={[
          {
            key: 'type',
            type: 'select',
            props: {
              placeholder: t('payments.form.paymentType'),
              size: 'large',
              options: [
                {
                  label: t(`payments.type.${PaymentTypeEnum.CASH}`),
                  value: PaymentTypeEnum.CASH,
                },
                {
                  label: t(`payments.type.${PaymentTypeEnum.BANK_TRANSFER}`),
                  value: PaymentTypeEnum.BANK_TRANSFER,
                },
                {
                  label: t(`payments.type.${PaymentTypeEnum.POS}`),
                  value: PaymentTypeEnum.POS,
                },
              ],
            },
          },
          {
            key: 'months',
            type: 'month',
            props: {
              size: 'large',
              placeholder: t('payments.form.month'),
            },
          },
          {
            key: 'sent',
            type: 'select',
            props: {
              placeholder: t('payments.sent'),
              size: 'large',
              options: [
                {
                  label: t('payments.table.sent.true'),
                  value: 'true',
                },
                {
                  label: t('payments.table.sent.false'),
                  value: 'false',
                },
              ],
            },
          },
        ]}
        initialFilterInfo={filterInfo}
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={(newFilterInfo) => {
          setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
          setFilterInfo(newFilterInfo);
        }}
      />

      <Table
        dataSource={payments}
        columns={columns}
        rowKey="id"
        loading={queryLoading}
        onChange={handleTableChange}
        pagination={{
          total,
          pageSize: pagination.pageSize,
          current: pagination.pageIndex + 1,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          showTotal: (total) => {
            const start = pagination.pageIndex * pagination.pageSize + 1;
            const end = start + (payments.length < pagination.pageSize ? payments.length : pagination.pageSize) - 1;
            return t('commons.table.pagination', { start, end, total });
          },
        }}
        scroll={{ x: 1100 }}
      />
    </Space>
  );
};

export default MemberPayments;
