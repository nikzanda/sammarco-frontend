import { App, Button, Col, Form, Result, Row, Skeleton, Space, Spin, Tabs, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaAngleLeft } from 'react-icons/fa';
import { useCourseDeleteMutation, useCourseQuery, useCourseUpdateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CourseForm } from './components';

const CourseEditPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

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
      message.success('courses.deleted');
      navigate(-1);
    },
  });

  useDisplayGraphQLErrors([queryError, updateError, deleteError]);

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
    updateCourse({
      variables: {
        input: {
          id: id!,
          ...values,
        },
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col xs={1} md={2}>
          <Button shape="circle" size="middle" icon={<Icon component={FaAngleLeft} />} onClick={() => navigate(-1)} />
        </Col>
        <Col xs={12} md={20}>
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
        <Col xs={5} md={2} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Space>
            {/* TODO: elimina corso */}
            {/* {course?.canDelete && (
            <Popconfirm
              title={t('courses.delete.confirm')}
              description={t('courses.delete.description', { fullName: course.fullName })}
              onConfirm={handleDelete}
            >
              <Button type="primary" danger loading={deleteLoading}>
                {t('buttons.delete.label')}
              </Button>
            </Popconfirm>
          )} */}
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
          items={[
            {
              label: t('courses.tab.details'),
              key: 'details',
              children: (
                <Form id="form" initialValues={course} layout="vertical" autoComplete="off" onFinish={handleFinish}>
                  <CourseForm />
                </Form>
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
