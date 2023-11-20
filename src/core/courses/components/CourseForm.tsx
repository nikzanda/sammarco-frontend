import { Col, ColorPicker, Form, Input, Row } from 'antd';
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
        <Form.Item label={t('courses.form.color.label')} tooltip={t('courses.form.color.tooltip')} name="color">
          <ColorPicker
            presets={[
              {
                label: t('courses.form.color.recommended'),
                colors: [
                  '#F5222D',
                  '#FA8C16',
                  '#FADB14',
                  '#8BBB11',
                  '#52C41A',
                  '#13A8A8',
                  '#1677FF',
                  '#2F54EB',
                  '#722ED1',
                  '#EB2F96',
                ],
              },
            ]}
          />
        </Form.Item>
      </Col>

      {/* TODO: input shifts */}
    </Row>
  );
};

export default CourseForm;
