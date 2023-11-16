import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';
import { TableColumnsType, Button, Result, Table, TableProps, Flex, Space } from 'antd';
import { format, set } from 'date-fns';
import { FaBan, FaPrint } from 'react-icons/fa';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useDisplayGraphQLErrors } from '../../../hooks';
import {
  MemberDetailFragment,
  PaymentFilter,
  PaymentListItemFragment,
  PaymentSortEnum,
  SortDirectionEnum,
  usePaymentsQuery,
} from '../../../generated/graphql';
import PDF from '../../payments/pdfs/receipt-pdf';
import { toCurrency } from '../../../utils/utils';
import { FeeTableFilter } from '../../fees/components';
import { NumberFilter } from '../../../commons';

const PAGE_SIZE = 10;

type Props = {
  member: MemberDetailFragment;
};

const MemberPayments: React.FC<Props> = ({ member }) => {
  const { t } = useTranslation();

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
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
      month: filterInfo?.month?.length ? (filterInfo.month[0] as string) : undefined,
      sortBy,
      sortDirection,
    };
    return result;
  }, [filterInfo.counter, filterInfo.fee, filterInfo.month, member.id, sortInfo.columnKey, sortInfo.order]);

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

  useDisplayGraphQLErrors(queryError);

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

  const columns = React.useMemo(() => {
    const result: TableColumnsType<PaymentListItemFragment> = [
      {
        title: t('payments.table.counter'),
        key: 'counter',
        dataIndex: 'counter',
        filterDropdown: NumberFilter,
        filteredValue: filterInfo.counter || null,
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
        render: (id) => <Button shape="circle" icon={<Icon component={FaPrint} />} onClick={() => handlePrint(id)} />,
      },
    ];
    return result;
  }, [filterInfo.counter, filterInfo.fee, t]);

  const handleTableChange: TableProps<PaymentListItemFragment>['onChange'] = (newPagination, filters, sorter) => {
    if (Object.values(filters).some((v) => v && v.length)) {
      setFilterInfo(filters);
    }
    setSortInfo(sorter as SorterResult<PaymentListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {queryError && (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong." // TODO: refetch
        />
      )}

      <Flex justify="end">
        <Button
          danger
          size="large"
          icon={<Icon component={FaBan} />}
          onClick={() => {
            setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
            setFilterInfo({});
          }}
        >
          {t('buttons.resetFilter.label')}
        </Button>
      </Flex>

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
      />
    </Space>
  );
};

export default MemberPayments;
