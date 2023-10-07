import React from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorageState from 'use-local-storage-state';
import { Button, Table, TableColumnsType } from 'antd';
import { format, set } from 'date-fns';
import { FaPrint } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { PaymentListItemFragment, usePaymentsQuery } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import PDF from './pdfs/receipt-pdf';

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
        title: t('member'),
        key: 'member',
        dataIndex: 'member',
        render: (member) => (
          <>
            {member.name} {member.surname}
          </>
        ),
      },
      {
        title: t('amount'),
        key: 'amount',
        dataIndex: 'amount',
        align: 'right',
        render: (amount) => <>{amount} €</>,
      },
      {
        title: t('month'),
        key: 'month',
        dataIndex: 'month',
        render: (rawMonth) => {
          if (!rawMonth) {
            return undefined;
          }

          const [year, month] = rawMonth.split('-');

          const str = format(set(Date.now(), { year, month }), 'MMMM yyyy');
          return str.charAt(0).toUpperCase() + str.slice(1);
        },
      },
      {
        key: 'actions',
        dataIndex: 'id',
        render: (id) => <Button shape="circle" icon={<Icon component={FaPrint} />} onClick={() => handlePrint(id)} />,
      },
    ];
    return result;
  }, [t]);

  return (
    <Table
      dataSource={payments}
      columns={columns}
      rowKey="id"
      loading={queryLoading}
      pagination={{
        total,
        pageSize: pagination.pageSize,
        current: pagination.pageIndex + 1,
      }}
    />
  );
};

export default PaymentListPage;
