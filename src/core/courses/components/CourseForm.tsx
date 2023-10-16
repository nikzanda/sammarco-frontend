import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CourseForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={24}>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('courses.form.name')}
          // TODO: validare nome univoco
          name="name"
          rules={[{ required: true, message: t('validations.required')! }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item label={t('courses.form.printName')} name="printName">
          <Input />
        </Form.Item>
      </Col>

      {/* TODO: input shifts */}
    </Row>
  );
};

export default CourseForm;
