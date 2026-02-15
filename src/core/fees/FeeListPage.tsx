import React from 'react';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { Flex, Table, TableProps, theme } from 'antd';
import Icon from '@ant-design/icons';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Highlighter from 'react-highlight-words';
import { FeeFilter, FeeListItemFragment, FeeSortEnum, SortDirectionEnum, useFeesQuery } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons, Filters, ListPageHeader } from '../../commons';
import { toCurrency } from '../../utils';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/fee/';

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
    let sortBy: FeeSortEnum;

    switch (sortInfo.columnKey) {
      case 'name':
        sortBy = FeeSortEnum.NAME;
        break;
      default:
        sortBy = FeeSortEnum.CREATED_AT;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const result: FeeFilter = {
      name: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      courseIds: filterInfo.course?.length ? (filterInfo.course as string[]) : undefined,
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

  useDisplayGraphQLErrors(queryError);

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
        width: 200,
        ellipsis: true,
        render: (name) => (
          <Highlighter
            searchWords={[searchText]}
            textToHighlight={name}
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          />
        ),
      },
      {
        title: t('fees.table.course'),
        key: 'course',
        dataIndex: ['course', 'name'],
        width: 160,
        ellipsis: true,
      },
      {
        title: t('fees.table.amount'),
        key: 'amount',
        dataIndex: 'amount',
        align: 'right',
        width: 100,
        render: (amount) => toCurrency(amount),
      },
      {
        title: t('fees.table.enabled'),
        key: 'enabled',
        dataIndex: 'enabled',
        align: 'center',
        width: 80,
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
        fixed: 'right',
        width: 100,
        render: (id) => (
          <ActionButtons
            buttons={['edit', 'clone']}
            onEdit={() => navigate(`/fees/${id}`)}
            onClone={() =>
              navigate('/fees/new', {
                state: {
                  feeId: id,
                },
              })
            }
          />
        ),
      },
    ];
    return result;
  }, [navigate, searchText, t, token.colorError, token.colorSuccess]);

  const handleTableChange: TableProps<FeeListItemFragment>['onChange'] = (newPagination, _filters, sorter) => {
    setSortInfo(sorter as SorterResult<FeeListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Flex vertical gap="middle">
      <ListPageHeader entity="fees" />

      <Filters
        topFilters={[
          {
            key: 'course',
            type: 'courses',
            props: {
              size: 'large',
              placeholder: t('members.form.courses'),
            },
          },
        ]}
        collapsableFilters={[]}
        initialFilterInfo={filterInfo}
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={(newFilterInfo) => {
          setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
          setFilterInfo(newFilterInfo);
        }}
      />

      <Table
        dataSource={fees}
        columns={columns}
        rowKey="id"
        loading={queryLoading}
        size="small"
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
        scroll={{ x: 700 }}
      />
    </Flex>
  );
};

export default FeeListPage;
