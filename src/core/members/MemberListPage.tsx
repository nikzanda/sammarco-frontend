import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Icon from '@ant-design/icons';
import { FaMoneyBill } from 'react-icons/fa';
import { MemberListItemFragment, useMembersQuery } from '../../generated/graphql';
import { PaymentCreateModal } from '../payments/components';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
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
        title: 'name',
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
  }, []);

  return (
    <>
      <Table dataSource={members} columns={columns} rowKey="id" />
      {memberId && <PaymentCreateModal memberId={memberId} onCancel={() => setMemberId(undefined)} />}
    </>
  );
};

export default MemberListPage;
