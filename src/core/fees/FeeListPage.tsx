import React from 'react';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { Button, Flex, Input, Space, Table, TableProps, Typography, theme } from 'antd';
import Icon from '@ant-design/icons';
import { FaPlus, FaBan, FaCheck, FaTimes } from 'react-icons/fa';
import { FeeFilter, FeeListItemFragment, FeeSortEnum, SortDirectionEnum, useFeesQuery } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons } from '../../commons';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/course/';

const FeeListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

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
  const [sortInfo, setSortInfo] = useLocalStorageState<SorterResult<FeeListItemFragment>>(
    `${LOCAL_STORAGE_PATH}sortInfo`,
    { defaultValue: { order: 'descend' } }
  );

  const queryFilter = React.useMemo(() => {
    let sortBy;
    let sortDirection;

    switch (sortInfo.columnKey) {
      case 'name':
        sortBy = FeeSortEnum.NAME;
        break;
      default:
        sortBy = FeeSortEnum.CREATED_AT;
    }
    if (sortBy) {
      sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;
    }

    const result: FeeFilter = {
      name: filterInfo.name?.length ? (filterInfo.name[0] as string).trim() : undefined,
      sortBy,
      sortDirection,
    };
    return result;
  }, [filterInfo, sortInfo]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useFeesQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
    },
  });

  useDisplayGraphQLErrors([queryError]);

  const fees = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.fees.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const total = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.fees.pageInfo.total;
    }
    return 0;
  }, [queryData, queryError, queryLoading]);

  const columns = React.useMemo(() => {
    const result: ColumnsType<FeeListItemFragment> = [
      {
        title: t('fees.table.name'),
        key: 'name',
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: t('fees.table.course'),
        key: 'course',
        dataIndex: 'course',
        render: (course: FeeListItemFragment['course']) => course && course.name,
      },
      {
        title: t('fees.table.amount'),
        key: 'amount',
        dataIndex: 'amount',
        align: 'right',
        render: (amount) => <>{amount} €</>,
      },
      {
        title: t('fees.table.enabled'),
        key: 'enabled',
        dataIndex: 'enabled',
        align: 'center',
        render: (enabled) =>
          enabled ? (
            <Icon component={FaCheck} style={{ color: token.colorSuccess }} />
          ) : (
            <Icon component={FaTimes} style={{ color: token.colorError }} />
          ),
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        render: (id) => <ActionButtons buttons={['edit']} onEdit={() => navigate(`/fees/${id}`)} />,
      },
    ];
    return result;
  }, [navigate, t, token.colorError, token.colorSuccess]);

  const handleTableChange: TableProps<FeeListItemFragment>['onChange'] = (newPagination, filters, sorter) => {
    if (Object.values(filters).some((v) => v && v.length)) {
      setSearchText('');
      setFilterInfo(filters);
    } else {
      setFilterInfo({
        ...(searchText && { name: [searchText] }),
      });
    }
    setSortInfo(sorter as SorterResult<FeeListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={2}>{t('fees.name')}</Typography.Title>
        <Button type="primary" size="large" icon={<Icon component={FaPlus} />} onClick={() => navigate('/fees/new')}>
          {t('fees.new')}
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
              name: [value],
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
        dataSource={fees}
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
            const end = start + (fees.length < pagination.pageSize ? fees.length : pagination.pageSize) - 1;
            return t('commons.table.pagination', { start, end, total });
          },
        }}
      />
    </Space>
  );
};

export default FeeListPage;
