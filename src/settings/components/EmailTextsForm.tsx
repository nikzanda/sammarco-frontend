import React from 'react';
import { Col, Collapse, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const EmailTextsForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Collapse
      items={['receipt', 'reminder'].map((type) => ({
        label: t(`settings.emailSettings.type.${type}`),
        key: type,
        children: (
          <Row gutter={24}>
            <Col xs={24} md={12} xxl={8}>
              <Form.Item
                label={t('settings.form.emailSettings.subject.label')}
                help={t('settings.form.emailSettings.subject.help')}
                name={['emailSettings', `${type}Email`, 'subject']}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={t('settings.form.emailSettings.body.label')}
                help={<span className="break-line">{t('settings.form.emailSettings.body.help')}</span>}
                name={['emailSettings', `${type}Email`, 'body']}
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
