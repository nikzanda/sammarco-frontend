import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Button, Flex, Input, Space, Table, Typography } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBan, FaPlus } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import {
  MemberFilter,
  MemberListItemFragment,
  MemberSortEnum,
  SortDirectionEnum,
  useMembersQuery,
} from '../../generated/graphql';
import { PaymentCreateModal } from '../payments/components';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons } from '../../commons';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [memberId, setMemberId] = React.useState<string>();

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
  const [sortInfo, setSortInfo] = useLocalStorageState<SorterResult<MemberListItemFragment>>(
    `${LOCAL_STORAGE_PATH}sortInfo`,
    { defaultValue: { order: 'descend' } }
  );

  const queryFilter = React.useMemo(() => {
    let sortBy;
    let sortDirection;

    switch (sortInfo.columnKey) {
      case 'fullName':
        sortBy = MemberSortEnum.NAME;
        break;
      default:
        sortBy = MemberSortEnum.CREATED_AT;
    }
    if (sortBy) {
      sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;
    }

    const result: MemberFilter = {
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      sortBy,
      sortDirection,
    };
    return result;
  }, [filterInfo.search, sortInfo.columnKey, sortInfo.order]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useMembersQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
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
        title: t('members.table.fullName'),
        key: 'fullName',
        dataIndex: 'fullName',
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        render: (id) => (
          <ActionButtons
            buttons={['edit', 'fee']}
            onEdit={() => navigate(`/members/${id}`)}
            onFee={() => setMemberId(id)}
          />
        ),
      },
    ];
    return result;
  }, [navigate, t]);

  const handleTableChange: TableProps<MemberListItemFragment>['onChange'] = (newPagination, filters, sorter) => {
    if (Object.values(filters).some((v) => v && v.length)) {
      setSearchText('');
      setFilterInfo(filters);
    } else {
      setFilterInfo({
        ...(searchText && { search: [searchText] }),
      });
    }
    setSortInfo(sorter as SorterResult<MemberListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={2}>{t('members.name')}</Typography.Title>
        <Button type="primary" size="large" icon={<Icon component={FaPlus} />} onClick={() => navigate('/members/new')}>
          {t('members.new')}
        </Button>
      </Flex>

      <Flex justify="space-between" align="center">
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
      </Flex>
      <Table
        dataSource={members}
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
            const end = start + (members.length < pagination.pageSize ? members.length : pagination.pageSize) - 1;
            return t('commons.table.pagination', { start, end, total });
          },
        }}
      />
      {memberId && <PaymentCreateModal memberId={memberId} onCancel={() => setMemberId(undefined)} />}
    </Space>
  );
};

export default MemberListPage;
