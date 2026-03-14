import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Flex, Table, TableColumnsType, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaFileCsv } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useQuery } from '@apollo/client/react';
import {
  EnrollmentStatusEnum,
  MemberFilter,
  MemberListItemFragment,
  MembersDocument,
  MemberSortEnum,
  SortDirectionEnum,
} from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { ActionButtons, Filters, ListPageHeader } from '../../commons';
import { ExportMembersModal } from './components';

const PAGE_SIZE = 20;
const LOCAL_STORAGE_PATH = 'filter/member/';

const MemberListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [exportCsv, setExportCsv] = React.useState(false);

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
    { defaultValue: { columnKey: 'fullName', order: 'ascend' } }
  );

  const queryFilter = React.useMemo(() => {
    let sortBy: MemberSortEnum;

    switch (sortInfo.columnKey) {
      case 'fullName':
        sortBy = MemberSortEnum.NAME;
        break;

      case 'taxCode':
        sortBy = MemberSortEnum.TAX_CODE;
        break;

      case 'createdAt':
        sortBy = MemberSortEnum.CREATED_AT;
        break;

      default:
        sortBy = MemberSortEnum.CREATED_AT;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const result: MemberFilter = {
      search: filterInfo.search?.length ? (filterInfo.search[0] as string).trim() : undefined,
      enrollmentStatus: filterInfo.enrollmentStatus?.length
        ? (filterInfo.enrollmentStatus[0] as EnrollmentStatusEnum)
        : undefined,
      sortBy,
      sortDirection,
    };
    return result;
  }, [filterInfo, sortInfo]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(MembersDocument, {
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
    },
  });

  useDisplayGraphQLErrors(queryError);

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
    const result: TableColumnsType<MemberListItemFragment> = [
      {
        title: t('members.table.fullName'),
        key: 'fullName',
        dataIndex: 'fullName',
        sorter: true,
        width: 200,
        ellipsis: true,
        render: (fullName: string) => (
          <Highlighter
            searchWords={[searchText]}
            textToHighlight={fullName}
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          />
        ),
      },
      {
        title: t('members.table.taxCode'),
        key: 'taxCode',
        dataIndex: 'taxCode',
        sorter: true,
        width: 180,
        ellipsis: true,
      },
      {
        title: t('members.table.email'),
        key: 'email',
        dataIndex: 'email',
        width: 200,
        ellipsis: true,
      },
      {
        title: t('members.table.phone'),
        key: 'phone',
        dataIndex: 'phone',
        width: 150,
      },
      {
        key: 'actions',
        dataIndex: 'id',
        align: 'right',
        fixed: 'right',
        width: 80,
        render: (id: string) => <ActionButtons buttons={['edit']} onEdit={() => navigate(`/members/${id}`)} />,
      },
    ];
    return result;
  }, [navigate, searchText, t]);

  const handleTableChange: TableProps<MemberListItemFragment>['onChange'] = (newPagination, _filters, sorter) => {
    setSortInfo(sorter as SorterResult<MemberListItemFragment>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Flex vertical gap="middle">
      <ListPageHeader
        entity="members"
        actions={[
          {
            key: 'export',
            label: t('commons.export.button'),
            icon: <Icon component={FaFileCsv} />,
            onClick: () => setExportCsv(true),
          },
        ]}
      />

      <Filters
        topFilters={[
          {
            key: 'enrollmentStatus',
            type: 'select',
            props: {
              size: 'large',
              placeholder: t('members.filters.byEnrollmentStatus'),
              options: [
                { label: t('enrollments.status.CONFIRMED'), value: EnrollmentStatusEnum.CONFIRMED },
                { label: t('enrollments.status.PENDING'), value: EnrollmentStatusEnum.PENDING },
              ],
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
        dataSource={members}
        columns={columns}
        rowKey="id"
        loading={queryLoading}
        size="small"
        onChange={handleTableChange}
        onRow={(record) => ({
          style:
            !record.currentEnrollment || record.currentEnrollment.status !== EnrollmentStatusEnum.CONFIRMED
              ? { opacity: 0.5 }
              : undefined,
        })}
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
        scroll={{ x: 600 }}
      />
      {exportCsv && <ExportMembersModal onCancel={() => setExportCsv(false)} />}
    </Flex>
  );
};

export default MemberListPage;
