import React from 'react';
import { App, Button, Col, Form, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { FaAngleLeft } from 'react-icons/fa';
import { useCourseCreateMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { CourseForm } from './components';

const CourseCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [createCourse, { loading, error }] = useCourseCreateMutation({
    refetchQueries: ['Courses', 'CoursesSearcher'],
    onCompleted: () => {
      message.success(t('courses.created'));
      navigate('/courses');
    },
  });

  useDisplayGraphQLErrors(error);

  const handleFinish = (values: any) => {
    createCourse({
      variables: {
        input: values,
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
          <Typography.Title level={3}>{t('courses.new')}</Typography.Title>
        </Col>
        <Col xs={5} md={2} style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Button type="primary" htmlType="submit" form="form" size="large" loading={loading}>
            {t('buttons.save.label')}
          </Button>
        </Col>
      </Row>

      <Form id="form" layout="vertical" autoComplete="off" onFinish={handleFinish}>
        <CourseForm />
      </Form>
    </Space>
  );
};

export default CourseCreatePage;
