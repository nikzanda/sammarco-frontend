import React from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorageState from 'use-local-storage-state';
import { Button, Flex, Space, Table, TableColumnsType, Typography } from 'antd';
import { format, set } from 'date-fns';
import { FaPrint } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { PaymentListItemFragment, usePaymentsQuery } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import PDF from './pdfs/receipt-pdf';
import { toCurrency } from '../../utils/utils';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const PaymentListPage: React.FC = () => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useLocalStorageState(`${LOCAL_STORAGE_PATH}pagination`, {
    defaultValue: {
      pageIndex: 0,
      pageSize: PAGE_SIZE,
    },
  });

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = usePaymentsQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    },
  });

  useDisplayGraphQLErrors([queryError]);

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
        title: t('payments.table.member'),
        key: 'member',
        dataIndex: 'member',
        render: (member) => member.fullName,
      },
      {
        title: t('payments.table.fee'),
        key: 'fee',
        dataIndex: 'fee',
        render: (fee) => fee.name,
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
  }, [t]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={2}>{t('payments.name')}</Typography.Title>
      </Flex>

      {/* <Flex justify='space-between' align='center'></Flex> */}

      <Table
        dataSource={payments}
        columns={columns}
        rowKey="id"
        loading={queryLoading}
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

export default PaymentListPage;
