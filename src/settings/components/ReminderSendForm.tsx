import { Col, Form, InputNumber, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ReminderSendForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={24}>
      <Col xs={24} md={12} xxl={8}>
        <Form.Item
          label={t('settings.form.reminderEmailMonthDay')}
          name="reminderEmailMonthDay"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={30} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default ReminderSendForm;
