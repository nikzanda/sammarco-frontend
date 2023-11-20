import React from 'react';
import { App, Button, Col, Form, Popconfirm, Result, Row, Skeleton, Space, Spin, Tabs, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaAngleLeft } from 'react-icons/fa';
import { useCourseDeleteMutation, useCourseQuery, useCourseUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CourseForm } from './components';
import { Updates } from '../../commons';

const DEFAULT_TAB = 'details';

const CourseEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = React.useState<string>(searchParams.get('tab') || DEFAULT_TAB);

  React.useEffect(() => {
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, tab]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useCourseQuery({
    variables: {
      id: id!,
    },
  });

  const [updateCourse, { loading: updateLoading, error: updateError }] = useCourseUpdateMutation({
    refetchQueries: ['Courses', 'Course'],
    onCompleted: () => {
      message.success(t('courses.edited'));
    },
  });

  const [deleteCourse, { loading: deleteLoading, error: deleteError }] = useCourseDeleteMutation({
    refetchQueries: ['Courses'],
    onCompleted: () => {
      message.success(t('courses.deleted'));
      navigate('/courses');
    },
  });

  useDisplayGraphQLErrors(queryError, updateError, deleteError);

  const course = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.course;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const title = React.useMemo(() => {
    if (!course) {
      return <Spin />;
    }
    return course.name;
  }, [course]);

  const handleDelete = () => {
    deleteCourse({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  };

  const handleFinish = (values: any) => {
    const { color, ...input } = values;

    updateCourse({
      variables: {
        input: {
          id: id!,
          ...input,
          ...(color && { color: typeof color === 'string' ? color : color.toHexString() }),
        },
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col xs={1} md={2}>
          <Button
            shape="circle"
            size="middle"
            icon={<Icon component={FaAngleLeft} />}
            onClick={() => navigate('/courses')}
          />
        </Col>
        <Col xs={12} md={20}>
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
        <Col xs={5} md={2} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Space>
            {course?.canDelete && (
              <Popconfirm
                title={t('courses.delete.confirm')}
                description={t('courses.delete.description', { name: course.name })}
                onConfirm={handleDelete}
              >
                <Button type="primary" size="large" danger loading={deleteLoading}>
                  {t('buttons.delete.label')}
                </Button>
              </Popconfirm>
            )}
            <Button type="primary" htmlType="submit" form="form" size="large" loading={updateLoading}>
              {t('buttons.save.label')}
            </Button>
          </Space>
        </Col>
      </Row>

      {queryLoading && <Skeleton active />}
      {queryError && (
        <Result
          status="500"
          title="500"
          subTitle={t('errors.something-went-wrong')} // TODO: refetch
        />
      )}
      {course && (
        <Tabs
          activeKey={tab}
          onChange={setTab}
          items={[
            {
              label: t('courses.tab.details'),
              key: 'details',
              children: (
                <>
                  <Form id="form" initialValues={course} layout="vertical" autoComplete="off" onFinish={handleFinish}>
                    <CourseForm />
                  </Form>

                  <Updates updates={course} />
                </>
              ),
            },
            // {
            //   label: t('courses.tab.payments'),
            //   key: 'payments',
            //   children: <coursePayments course={course} />,
            // },
          ]}
        />
      )}
    </Space>
  );
};

export default CourseEditPage;
