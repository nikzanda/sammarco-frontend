import React from 'react';
import { App, Button, Form, FormProps, Input, Radio, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';
import { FaPaperPlane } from 'react-icons/fa';
import { CommunicationRecipientEnum, useSendCommunicationMutation } from '../../generated/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { AttachmentInput, QuillEditor } from '../../commons';

const CommunicationPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [sendCommunication, { loading: mutationLoading, error: mutationError }] = useSendCommunicationMutation({
    onCompleted: ({ sendCommunication: { result } }) => {
      if (result) {
        message.success(t('emails.sent'));
        form.resetFields();
      }
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleSubmit: FormProps['onFinish'] = (values) => {
    sendCommunication({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Typography.Title level={3}>{t('communication.page.title')}</Typography.Title>

        <Button
          type="primary"
          htmlType="submit"
          form="form"
          size="large"
          icon={<Icon component={FaPaperPlane} />}
          loading={mutationLoading}
        >
          {t('commons.send')}
        </Button>
      </Row>

      <Form
        id="form"
        form={form}
        layout="vertical"
        autoComplete="off"
        initialValues={{ recipient: CommunicationRecipientEnum.EXCLUDE }}
        onFinish={handleSubmit}
      >
        <Form.Item name="recipient" label={t('communication.form.recipient.label')} rules={[{ required: true }]}>
          <Radio.Group
            options={[
              { label: t('communication.form.recipient.options.all'), value: CommunicationRecipientEnum.ALL },
              { label: t('communication.form.recipient.options.exclude'), value: CommunicationRecipientEnum.EXCLUDE },
            ]}
          />
        </Form.Item>

        <Form.Item name="subject" label={t('communication.form.subject')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="body" label={t('communication.form.body')} rules={[{ required: true }]}>
          <QuillEditor />
        </Form.Item>

        <Form.Item name="attachments" label={t('communication.form.attachments')}>
          <AttachmentInput dragger listType="picture-card" />
        </Form.Item>
      </Form>
    </Space>
  );
};

export default CommunicationPage;
