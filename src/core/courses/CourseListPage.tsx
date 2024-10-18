import React from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { Badge, Space, Table, TableColumnsType, TableProps } from 'antd';
import Highlighter from 'react-highlight-words';
import {
  CourseFilter,
  CourseListItemFragment,
  CourseSortEnum,
  SortDirectionEnum,
  useCoursesQuery,
} from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons, Filters, ListPageHeader } from '../../commons';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/course/';

const CourseListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  const [sortInfo, setSortInfo] = useLocalStorageState<SorterResult<CourseListItemFragment>>(
    `${LOCAL_STORAGE_PATH}sortInfo`,
    { defaultValue: { order: 'descend' } }
  );

  const queryFilter = React.useMemo(() => {
    let sortBy: CourseSortEnum;

    switch (sortInfo.columnKey) {
      case 'name':
        sortBy = CourseSortEnum.NAME;
        break;
      default:
        sortBy = CourseSortEnum.CREATED_AT;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const result: CourseFilter = {
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
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
  } = useCoursesQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
    },
  });

  useDisplayGraphQLErrors(queryError);

  const courses = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.courses.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const total = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.courses.pageInfo.total;
    }
    return 0;
  }, [queryData, queryError, queryLoading]);

  const columns = React.useMemo(() => {
    const result: TableColumnsType<CourseListItemFragment> = [
      {
        title: t('courses.table.name'),
        key: 'name',
        dataIndex: 'name',
        sorter: true,
        render: (name, { color }) => (
          <>
            <Highlighter
              searchWords={[searchText]}
              textToHighlight={name}
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            />{' '}
            {color && <Badge color={color} />}
          </>
        ),
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        width: 60,
        render: (id) => <ActionButtons buttons={['edit']} onEdit={() => navigate(`/courses/${id}`)} />,
      },
    ];
    return result;
  }, [navigate, searchText, t]);

  const handleTableChange: TableProps<CourseListItemFragment>['onChange'] = (newPagination, _filters, sorter) => {
    setSortInfo(sorter as SorterResult<CourseListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ListPageHeader entity="courses" />

      <Filters
        topFilters={[]}
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
        dataSource={courses}
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
            const end = start + (courses.length < pagination.pageSize ? courses.length : pagination.pageSize) - 1;
            return t('commons.table.pagination', { start, end, total });
          },
        }}
      />
    </Space>
  );
};

export default CourseListPage;
