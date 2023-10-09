import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Icon from '@ant-design/icons';
import { FaMoneyBill } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MemberListItemFragment, useMembersQuery } from '../../generated/graphql';
import { PaymentCreateModal } from '../payments/components';
import { useDisplayGraphQLErrors } from '../../hooks';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [memberId, setMemberId] = React.useState<string>();

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
  } = useMembersQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    },
  });

  useDisplayGraphQLErrors([queryError]);

  const members = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const total = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.members.pageInfo.total;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const columns = React.useMemo(() => {
    const result: ColumnsType<MemberListItemFragment> = [
      {
        title: t('name'),
        key: 'name',
        render: (value, member) => (
          <>
            {member.name} {member.surname}
          </>
        ),
      },
      {
        key: 'actions',
        dataIndex: 'id',
        render: (id) => (
          <Button shape="circle" icon={<Icon component={FaMoneyBill} />} onClick={() => setMemberId(id)} />
        ),
      },
    ];
    return result;
  }, [t]);

  return (
    <>
      <Button type="primary" onClick={() => navigate('/members/new')}>
        {t('member.new')}
      </Button>
      <Table
        dataSource={members}
        columns={columns}
        rowKey="id"
        loading={queryLoading}
        pagination={{
          total,
          pageSize: pagination.pageSize,
          current: pagination.pageIndex + 1,
        }}
      />
      {memberId && <PaymentCreateModal memberId={memberId} onCancel={() => setMemberId(undefined)} />}
    </>
  );
};

export default MemberListPage;
