import React from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorageState from 'use-local-storage-state';
import { App, Button, Col, Flex, Input, Row, Space, Table, TableColumnsType, TableProps, Typography } from 'antd';
import { format, set } from 'date-fns';
import { FaBan, FaPrint } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import {
  PaymentFilter,
  PaymentListItemFragment,
  PaymentSortEnum,
  SortDirectionEnum,
  usePaymentSendMutation,
  usePaymentUpdateMultipleMutation,
  usePaymentsQuery,
} from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import PDF from './pdfs/receipt-pdf';
import { toCurrency } from '../../utils/utils';
import { ActionButtons } from '../../commons';
import { MemberTableFilter } from '../members/components';
import { FeeTableFilter } from '../fees/components';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/payment/';

const PaymentListPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [sendingIds, setSendingIds] = React.useState<string[]>([]);

  const [searchText, setSearchText] = useLocalStorageState<string>(`${LOCAL_STORAGE_PATH}searchText`, {
    defaultValue: '',
  });
  const [pagination, setPagination] = useLocalStorageState(`${LOCAL_STORAGE_PATH}pagination`, {
    defaultValue: {
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    },
  });
  const [filterInfo, setFilterInfo] = useLocalStorageState<Record<string, FilterValue | null>>(
    `${LOCAL_STORAGE_PATH}filterInfo`,
    {
      defaultValue: {},
    }
  );
  const [sortInfo, setSortInfo] = useLocalStorageState<SorterResult<PaymentListItemFragment>>(
    `${LOCAL_STORAGE_PATH}sortInfo`,
    { defaultValue: { order: 'descend' } }
  );

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
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      counter: filterInfo?.counter?.length ? (filterInfo.counter[0] as number) : undefined,
      memberIds: filterInfo?.member?.length ? (filterInfo.member as string[]) : undefined,
      feeIds: filterInfo?.fee?.length ? (filterInfo.fee as string[]) : undefined,
      month: filterInfo?.month?.length ? (filterInfo.month[0] as string) : undefined,
      sortBy,
      sortDirection,
    };
    return result;
  }, [filterInfo, sortInfo]);

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

  const [updateMultiple, { error: updateMultipleError }] = usePaymentUpdateMultipleMutation({
    refetchQueries: ['Payments', 'Payment'],
  });

  const [sendEmail, { error: sendError }] = usePaymentSendMutation({
    refetchQueries: ['Payments', 'Payment'],
    onCompleted: () => {
      message.success(t('payments.sent'));
    },
  });

  useDisplayGraphQLErrors(queryError, sendError, updateMultipleError);

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

  const handlePrint = React.useCallback(
    (paymentId: string) => {
      if (payments.some(({ id, printed }) => id === paymentId && !printed)) {
        updateMultiple({
          variables: {
            input: {
              ids: [paymentId],
              printed: true,
            },
          },
        });
      }
      PDF.print(paymentId);
    },
    [payments, updateMultiple]
  );

  const handlePrintMultiple = () => {
    const ids = payments.filter(({ id, printed }) => selectedIds.includes(id) && !printed).map(({ id }) => id);

    if (ids.length > 0) {
      updateMultiple({
        variables: {
          input: {
            ids,
            printed: true,
          },
        },
      });
    }
    PDF.printMultiple(selectedIds);
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
        title: t('payments.table.member'),
        key: 'member',
        dataIndex: ['member', 'fullName'],
        filterDropdown: MemberTableFilter,
        filteredValue: filterInfo.member || null,
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
        filterDropdown: FeeTableFilter,
        filteredValue: filterInfo.fee || null,
      },
      {
        title: t('payments.table.amount'),
        key: 'amount',
        dataIndex: 'amount',
        align: 'right',
        render: (amount) => toCurrency(amount),
      },
      {
        title: t('payments.table.details'),
        key: 'details',
        // TODO: filtro
        render: (_, { month: rawMonth, years }) => {
          if (rawMonth) {
            const [year, month] = rawMonth.split('-').map((value) => parseInt(value, 10));

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
        render: (id, { printed, sent }) => (
          <ActionButtons
            buttons={[
              'edit',
              { button: 'print', printed },
              { button: 'send', sent, disabled: sendingIds.includes(id) },
            ]}
            onEdit={() => navigate(`/payments/${id}`)}
            onPrint={() => handlePrint(id)}
            onSend={() => handleSend(id)}
          />
        ),
      },
    ];
    return result;
  }, [filterInfo.fee, filterInfo.member, handlePrint, handleSend, navigate, sendingIds, t]);

  const handleTableChange: TableProps<PaymentListItemFragment>['onChange'] = (newPagination, filters, sorter) => {
    if (Object.values(filters).some((v) => v && v.length)) {
      setSearchText('');
      setFilterInfo(filters);
    } else {
      setFilterInfo({
        ...(searchText && { search: [searchText] }),
      });
    }
    setSortInfo(sorter as SorterResult<PaymentListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={2}>{t('payments.name')}</Typography.Title>
      </Flex>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <Input.Search
            placeholder={t('commons.searchPlaceholder')!}
            allowClear
            enterButton
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => {
              setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
              setFilterInfo({
                search: [value],
              });
            }}
          />
        </Col>

        <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Button
            size="large"
            icon={<Icon component={FaPrint} />}
            disabled={selectedIds.length === 0}
            onClick={handlePrintMultiple}
          >
            {t('buttons.print.label')}
          </Button>
          <Button
            danger
            size="large"
            icon={<Icon component={FaBan} />}
            onClick={() => {
              setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
              setFilterInfo({});
              setSearchText('');
            }}
          >
            {t('buttons.resetFilter.label')}
          </Button>
        </Col>
      </Row>

      {selectedIds.length > 0 && <span>{t('commons.selected', { selected: selectedIds.length, total })}</span>}
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
        rowSelection={{
          selections: [Table.SELECTION_NONE],
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedIds,
          onChange: (selectedRowKeys) => setSelectedIds(selectedRowKeys as string[]),
        }}
      />
    </Space>
  );
};

export default PaymentListPage;
