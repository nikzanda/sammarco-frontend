import React from 'react';
import { Row, Col, Input, InputNumber, Switch, Tooltip, Button, Form, App, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useVerifyEmailSettingsMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';

const EmailSettingsForm: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [verifyEmailSettings, { loading, error }] = useVerifyEmailSettingsMutation({
    onCompleted: () => {
      message.success(t('settings.emailSettings.verified'));
    },
  });

  useDisplayGraphQLErrors(error);

  const handleVerify = () => {
    verifyEmailSettings();
  };

  return (
    <>
      <Divider plain>{t('settings.emailSettings.text')}</Divider>

      <Row gutter={24}>
        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.subject.label')}
            help={t('settings.form.emailSettings.subject.help')}
            name={['emailSettings', 'subject']}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label={t('settings.form.emailSettings.body.label')}
            help={<span className="break-line">{t('settings.form.emailSettings.body.help')}</span>}
            name={['emailSettings', 'body']}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Col>
      </Row>

      <Divider plain>{t('settings.emailSettings.credentials')}</Divider>

      <Row gutter={24}>
        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('settings.form.emailSettings.host')} name={['emailSettings', 'host']}>
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('settings.form.emailSettings.port')} name={['emailSettings', 'port']}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.secure')}
            name={['emailSettings', 'secure']}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.ignoreTLS')}
            name={['emailSettings', 'ignoreTLS']}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.email')}
            name={['emailSettings', 'email']}
            rules={[{ type: 'email' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item label={t('settings.form.emailSettings.password')} name={['emailSettings', 'password']}>
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Tooltip title={t('settings.emailSettings.verify.tooltip')}>
          <Button onClick={handleVerify} loading={loading}>
            {t('settings.emailSettings.verify.label')}
          </Button>
        </Tooltip>
      </Row>
    </>
  );
};

export default EmailSettingsForm;
