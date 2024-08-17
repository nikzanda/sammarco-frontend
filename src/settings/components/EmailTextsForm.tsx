import React from 'react';
import { Col, Collapse, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const EmailTextsForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Collapse
      items={['receipt', 'reminder'].map((type) => ({
        label: t(`settings.emailTextList.type.${type}`),
        key: type,
        children: (
          <Row gutter={24}>
            <Col xs={24} md={12} xxl={8}>
              <Form.Item
                label={t(`settings.form.emailText.${type}.subject.label`)}
                help={t(`settings.form.emailText.${type}.subject.help`)}
                name={['emailTextList', type, 'subject']}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={t(`settings.form.emailText.${type}.body.label`)}
                help={<span className="break-line">{t(`settings.form.emailText.${type}.body.help`)}</span>}
                name={['emailTextList', type, 'body']}
              >
                <Input.TextArea rows={6} />
              </Form.Item>
            </Col>
          </Row>
        ),
      }))}
    />
  );
};

export default EmailTextsForm;
