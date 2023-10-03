import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MemberListItemFragment, useMembersQuery } from '../../generated/graphql';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
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
        key: 'displayName',
        // dataIndex: ['name', 'surname'],
        dataIndex: 'name',
        render: (value) => JSON.stringify(value),
      },
    ];
    return result;
  }, []);

  return <Table dataSource={members} columns={columns} rowKey="id" />;
};

export default MemberListPage;
