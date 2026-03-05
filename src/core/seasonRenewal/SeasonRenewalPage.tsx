import React from 'react';
import { App, Badge, Button, Descriptions, Flex, Steps, Table, TableColumnsType, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  CopyCoursesDocument,
  CopyFeesDocument,
  CourseListItemFragment,
  CoursesDocument,
  EnrollmentListItemFragment,
  EnrollmentsDocument,
  EnrollmentStatusEnum,
  FeeListItemFragment,
  FeesDocument,
  FeeTypeEnum,
  QualificationEnum,
  SeasonRenewDocument,
} from '../../gql/graphql';
import { SocialYearContext } from '../../contexts';
import { useDisplayGraphQLErrors } from '../../hooks';
import { toCurrency } from '../../utils';

const PAGE_SIZE = 500;

const SeasonRenewalPage: React.FC = () => {
  const { socialYear } = React.useContext(SocialYearContext);
  const { t } = useTranslation();
  const { message } = App.useApp();

  const toYear = socialYear + 1;
  const toYearShort = String(toYear + 1).slice(-2);

  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedCourseIds, setSelectedCourseIds] = React.useState<string[]>([]);
  const [selectedFeeIds, setSelectedFeeIds] = React.useState<string[]>([]);
  const [selectedEnrollmentIds, setSelectedEnrollmentIds] = React.useState<string[]>([]);

  // Queries
  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError,
  } = useQuery(CoursesDocument, {
    variables: { pageIndex: 0, pageSize: PAGE_SIZE },
  });

  const {
    data: feesData,
    loading: feesLoading,
    error: feesError,
  } = useQuery(FeesDocument, {
    variables: { pageIndex: 0, pageSize: PAGE_SIZE },
  });

  const {
    data: enrollmentsData,
    loading: enrollmentsLoading,
    error: enrollmentsError,
  } = useQuery(EnrollmentsDocument, {
    variables: {
      pageIndex: 0,
      pageSize: PAGE_SIZE,
      filter: { status: EnrollmentStatusEnum.CONFIRMED },
    },
  });

  useDisplayGraphQLErrors(coursesError, feesError, enrollmentsError);

  // Mutations
  const [copyCourses, { loading: copyCoursesLoading, error: copyCoursesError }] = useMutation(CopyCoursesDocument);
  const [copyFees, { loading: copyFeesLoading, error: copyFeesError }] = useMutation(CopyFeesDocument);
  const [seasonRenew, { loading: seasonRenewLoading, error: seasonRenewError }] = useMutation(SeasonRenewDocument);

  useDisplayGraphQLErrors(copyCoursesError, copyFeesError, seasonRenewError);

  const mutationLoading = copyCoursesLoading || copyFeesLoading || seasonRenewLoading;

  // Data
  const courses = React.useMemo(() => {
    if (!coursesLoading && !coursesError && coursesData) {
      return coursesData.courses.data;
    }
    return [];
  }, [coursesData, coursesError, coursesLoading]);

  const fees = React.useMemo(() => {
    if (!feesLoading && !feesError && feesData) {
      return feesData.fees.data;
    }
    return [];
  }, [feesData, feesError, feesLoading]);

  const enrollments = React.useMemo(() => {
    if (!enrollmentsLoading && !enrollmentsError && enrollmentsData) {
      return enrollmentsData.enrollments.data;
    }
    return [];
  }, [enrollmentsData, enrollmentsError, enrollmentsLoading]);

  // Select all by default when data loads
  React.useEffect(() => {
    if (courses.length > 0 && selectedCourseIds.length === 0) {
      setSelectedCourseIds(courses.map((c) => c.id));
    }
  }, [courses, selectedCourseIds.length]);

  React.useEffect(() => {
    if (fees.length > 0 && selectedFeeIds.length === 0) {
      setSelectedFeeIds(fees.map((f) => f.id));
    }
  }, [fees, selectedFeeIds.length]);

  React.useEffect(() => {
    if (enrollments.length > 0 && selectedEnrollmentIds.length === 0) {
      setSelectedEnrollmentIds(enrollments.map((e) => e.id));
    }
  }, [enrollments, selectedEnrollmentIds.length]);

  // Columns
  const courseColumns = React.useMemo(() => {
    const result: TableColumnsType<CourseListItemFragment> = [
      {
        title: t('courses.table.name'),
        key: 'name',
        dataIndex: 'name',
        render: (name: string, { color }) => (
          <>
            {name} {color && <Badge color={color} />}
          </>
        ),
      },
    ];
    return result;
  }, [t]);

  const feeColumns = React.useMemo(() => {
    const result: TableColumnsType<FeeListItemFragment> = [
      {
        title: t('fees.table.name'),
        key: 'name',
        dataIndex: 'name',
        width: 200,
        ellipsis: true,
      },
      {
        title: t('fees.table.type'),
        key: 'type',
        dataIndex: 'type',
        width: 120,
        render: (type: FeeTypeEnum) => t(`fees.type.${type}`),
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
        render: (amount: number) => toCurrency(amount),
      },
    ];
    return result;
  }, [t]);

  const enrollmentColumns = React.useMemo(() => {
    const result: TableColumnsType<EnrollmentListItemFragment> = [
      {
        title: t('seasonRenewal.table.member'),
        key: 'member',
        dataIndex: ['member', 'fullName'],
        ellipsis: true,
      },
      {
        title: t('seasonRenewal.table.courses'),
        key: 'courses',
        dataIndex: 'courses',
        ellipsis: true,
        render: (courses: EnrollmentListItemFragment['courses']) => courses.map((c) => c.name).join(', '),
      },
      {
        title: t('seasonRenewal.table.qualification'),
        key: 'qualification',
        dataIndex: 'qualification',
        width: 160,
        render: (qualification: QualificationEnum) => t(`members.qualification.${qualification}`),
      },
    ];
    return result;
  }, [t]);

  // Confirm handler
  const handleConfirm = async () => {
    if (selectedCourseIds.length === 0 && selectedFeeIds.length === 0 && selectedEnrollmentIds.length === 0) {
      message.warning(t('seasonRenewal.nothingSelected'));
      return;
    }

    let coursesCreated = 0;
    let feesCreated = 0;
    let enrollmentsCreated = 0;

    if (selectedCourseIds.length > 0) {
      const result = await copyCourses({
        variables: { input: { courseIds: selectedCourseIds, toYear } },
      });
      coursesCreated = result.data?.copyCourses.createdCount ?? 0;
    }

    if (selectedFeeIds.length > 0) {
      const result = await copyFees({
        variables: { input: { feeIds: selectedFeeIds, toYear } },
      });
      feesCreated = result.data?.copyFees.createdCount ?? 0;
    }

    if (selectedEnrollmentIds.length > 0) {
      const result = await seasonRenew({
        variables: { input: { enrollmentIds: selectedEnrollmentIds, toYear } },
      });
      enrollmentsCreated = result.data?.seasonRenew.createdCount ?? 0;
    }

    message.success(
      t('seasonRenewal.success', {
        courses: coursesCreated,
        fees: feesCreated,
        enrollments: enrollmentsCreated,
      })
    );
  };

  const steps = [
    { title: t('seasonRenewal.steps.courses') },
    { title: t('seasonRenewal.steps.fees') },
    { title: t('seasonRenewal.steps.enrollments') },
    { title: t('seasonRenewal.steps.summary') },
  ];

  return (
    <Flex vertical gap="middle">
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} style={{ margin: 0 }}>
          {t('seasonRenewal.title', { toYear, toYearShort })}
        </Typography.Title>
      </Flex>

      <Steps current={currentStep} items={steps} style={{ marginBottom: 16 }} />

      {/* Step 0: Courses */}
      <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
        <Table
          dataSource={courses}
          columns={courseColumns}
          rowKey="id"
          loading={coursesLoading}
          size="small"
          pagination={false}
          rowSelection={{
            selectedRowKeys: selectedCourseIds,
            onChange: (keys) => setSelectedCourseIds(keys as string[]),
          }}
        />
      </div>

      {/* Step 1: Fees */}
      <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
        <Table
          dataSource={fees}
          columns={feeColumns}
          rowKey="id"
          loading={feesLoading}
          size="small"
          pagination={false}
          scroll={{ x: 600 }}
          rowSelection={{
            selectedRowKeys: selectedFeeIds,
            onChange: (keys) => setSelectedFeeIds(keys as string[]),
          }}
        />
      </div>

      {/* Step 2: Enrollments */}
      <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
        <Table
          dataSource={enrollments}
          columns={enrollmentColumns}
          rowKey="id"
          loading={enrollmentsLoading}
          size="small"
          pagination={false}
          scroll={{ x: 600 }}
          rowSelection={{
            selectedRowKeys: selectedEnrollmentIds,
            onChange: (keys) => setSelectedEnrollmentIds(keys as string[]),
          }}
        />
      </div>

      {/* Step 3: Summary */}
      {currentStep === 3 && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label={t('seasonRenewal.steps.courses')}>
            {t('seasonRenewal.summary.courses', { count: selectedCourseIds.length })}
          </Descriptions.Item>
          <Descriptions.Item label={t('seasonRenewal.steps.fees')}>
            {t('seasonRenewal.summary.fees', { count: selectedFeeIds.length })}
          </Descriptions.Item>
          <Descriptions.Item label={t('seasonRenewal.steps.enrollments')}>
            {t('seasonRenewal.summary.enrollments', { count: selectedEnrollmentIds.length })}
          </Descriptions.Item>
        </Descriptions>
      )}

      <Flex justify="space-between">
        {currentStep > 0 ? (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>{t('buttons.back')}</Button>
        ) : (
          <div />
        )}
        {currentStep < 3 && (
          <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
            {t('buttons.next')}
          </Button>
        )}
        {currentStep === 3 && (
          <Button type="primary" loading={mutationLoading} onClick={handleConfirm}>
            {t('seasonRenewal.confirm')}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default SeasonRenewalPage;
