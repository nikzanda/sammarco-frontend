import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';
import { TableColumnsType, Button, Result, Table } from 'antd';
import { format, set } from 'date-fns';
import { FaPrint } from 'react-icons/fa';
import { useDisplayGraphQLErrors } from '../../../hooks';
import { MemberDetailFragment, PaymentListItemFragment, usePaymentsQuery } from '../../../generated/graphql';
import PDF from '../../payments/pdfs/receipt-pdf';

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

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = usePaymentsQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: {
        memberId: member.id,
      },
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
    <>
      {queryError && <Result />}

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
    </>
  );
};

export default MemberPayments;
