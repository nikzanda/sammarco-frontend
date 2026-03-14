import React from 'react';
import { Badge, Button, Table, TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { EnrollmentListItemFragment, EnrollmentStatusEnum, EnrollmentsDocument } from '../../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../../hooks';

interface Props {
  memberId: string;
}

const MemberEnrollments: React.FC<Props> = ({ memberId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(EnrollmentsDocument, {
    variables: {
      pageIndex: 0,
      pageSize: 100,
      filter: {
        memberIds: [memberId],
        socialYear: null,
      },
    },
  });

  useDisplayGraphQLErrors(queryError);

  const enrollments = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.enrollments.data;
    }
    return [];
  }, [queryData, queryError, queryLoading]);

  const columns = React.useMemo(() => {
    const result: TableColumnsType<EnrollmentListItemFragment> = [
      {
        title: t('enrollments.table.socialYear'),
        key: 'socialYear',
        dataIndex: 'socialYear',
        width: 120,
        render: (socialYear: number) => `${socialYear}/${(socialYear + 1).toString().slice(-2)}`,
      },
      {
        title: t('enrollments.table.status'),
        key: 'status',
        dataIndex: 'status',
        width: 120,
        render: (status: EnrollmentStatusEnum) => (
          <Badge
            status={status === EnrollmentStatusEnum.CONFIRMED ? 'success' : 'warning'}
            text={t(`enrollments.status.${status}`)}
          />
        ),
      },
      {
        title: t('enrollments.table.courses'),
        key: 'courses',
        width: 200,
        ellipsis: true,
        render: (_, { courses }) => courses.map(({ name }) => name).join(', '),
      },
      {
        title: t('enrollments.table.qualification'),
        key: 'qualification',
        dataIndex: 'qualification',
        width: 150,
        render: (qualification: string) => t(`members.qualification.${qualification}`),
      },
      {
        title: t('enrollments.table.socialCardNumber'),
        key: 'socialCardNumber',
        dataIndex: 'socialCardNumber',
        align: 'center',
        width: 120,
      },
      {
        key: 'actions',
        align: 'right',
        width: 100,
        render: (_, { id }) => (
          <Button type="link" onClick={() => navigate(`/enrollments/${id}`)}>
            {t('buttons.edit.label')}
          </Button>
        ),
      },
    ];
    return result;
  }, [navigate, t]);

  return (
    <Table
      dataSource={enrollments}
      columns={columns}
      rowKey="id"
      loading={queryLoading}
      size="small"
      pagination={false}
    />
  );
};

export default MemberEnrollments;
