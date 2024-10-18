import React from 'react';
import { Table, TableColumnsType, TableProps, Tag, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { SorterResult } from 'antd/es/table/interface';
import { format } from 'date-fns';
import {
  EmailFilter,
  EmailSortEnum,
  EmailsQuery,
  EmailTypeEnum,
  SortDirectionEnum,
  useEmailsQuery,
} from '../../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

type TableData = EmailsQuery['emails']['data'][number];

const defaultProps = {
  filters: undefined,
};

interface Props {
  filters?: EmailFilter;
}

const PAGE_SIZE = 10;

const EmailTable: React.FC<Props> = ({ filters }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: PAGE_SIZE });
  const [sortInfo, setSortInfo] = React.useState<SorterResult<TableData>>({ order: 'descend' });

  const queryFilter = React.useMemo(() => {
    let sortBy: EmailSortEnum;

    switch (sortInfo.columnKey) {
      default:
        sortBy = EmailSortEnum.CREATED_AT;
    }

    const sortDirection = sortInfo.order === 'ascend' ? SortDirectionEnum.ASC : SortDirectionEnum.DESC;

    const result: EmailFilter = {
      sortBy,
      sortDirection,
      ...(filters && filters),
    };
    return result;
  }, [filters, sortInfo]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useEmailsQuery({
    variables: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filter: queryFilter,
    },
  });

  useDisplayGraphQLErrors(queryError);

  const emails = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.emails.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const total = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.emails.pageInfo.total;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const columns = React.useMemo(() => {
    const result: TableColumnsType<TableData> = [
      {
        key: 'type',
        dataIndex: 'type',
        align: 'center',
        render: (type: EmailTypeEnum) => {
          const color = {
            [EmailTypeEnum.RECEIPT]: token.colorSuccess,
            [EmailTypeEnum.REMINDER]: token.colorError,
            [EmailTypeEnum.MEDICAL_CERTIFICATE_EXPIRATION]: token.colorWarning,
          }[type];
          return <Tag color={color}>{t(`emails.type.${type}`)}</Tag>;
        },
      },
      {
        title: t('emails.table.course'),
        key: 'course',
        dataIndex: ['course', 'name'],
      },
      {
        title: t('emails.table.subject'),
        key: 'subject',
        dataIndex: 'subject',
      },
      {
        title: t('emails.table.to'),
        key: 'to',
        dataIndex: 'to',
      },
      {
        title: t('commons.table.createdAt'),
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (createdAt) => format(createdAt, 'dd/MM/yyyy HH:mm'),
      },
    ];
    return result;
  }, [t, token.colorError, token.colorSuccess, token.colorWarning]);

  const handleTableChange: TableProps<TableData>['onChange'] = (newPagination, _filters, sorter) => {
    setSortInfo(sorter as SorterResult<TableData>);
    setPagination({
      pageIndex: newPagination.current! - 1,
      pageSize: newPagination.pageSize!,
    });
  };

  return (
    <Table
      dataSource={emails}
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
          const end = start + (emails.length < pagination.pageSize ? emails.length : pagination.pageSize) - 1;
          return t('commons.table.pagination', { start, end, total });
        },
      }}
      expandable={{
        // eslint-disable-next-line react/no-unstable-nested-components, react/no-danger
        expandedRowRender: (email) =>
          /<\/?[a-z][\s\S]*>/i.test(email.body) ? (
            <div dangerouslySetInnerHTML={{ __html: email.body }} />
          ) : (
            <p style={{ whiteSpace: 'pre-line' }}>{email.body}</p>
          ),
      }}
      scroll={{ x: 600 }}
    />
  );
};

EmailTable.defaultProps = defaultProps;

export default EmailTable;
