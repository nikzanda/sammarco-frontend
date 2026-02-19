import React from 'react';
import { Row, Col, Input, InputNumber, Switch, Tooltip, Button, Form, App } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client/react';
import { VerifyEmailSettingsDocument } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';

const EmailSettingsForm: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [verifyEmailSettings, { loading, error }] = useMutation(VerifyEmailSettingsDocument, {
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
      <Row gutter={24}>
        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.host')}
            name={['emailSettings', 'host']}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.port')}
            name={['emailSettings', 'port']}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.secure')}
            name={['emailSettings', 'secure']}
            valuePropName="checked"
            rules={[{ required: true }]}
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} xxl={8}>
          <Form.Item
            label={t('settings.form.emailSettings.name.label')}
            tooltip={t('settings.form.emailSettings.name.tooltip')}
            name={['emailSettings', 'name']}
          >
            <Input />
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
