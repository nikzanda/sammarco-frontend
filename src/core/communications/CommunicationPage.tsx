import React from 'react';
import { App, Button, Flex, Form, FormProps, Input, Radio, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';
import { FaPaperPlane } from 'react-icons/fa';
import { useMutation } from '@apollo/client/react';
import { CommunicationRecipientEnum, SendCommunicationDocument } from '../../gql/graphql';
import { useDisplayGraphQLErrors } from '../../hooks';
import { AttachmentInput, QuillEditor } from '../../commons';

const CommunicationPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [sendCommunication, { loading: mutationLoading, error: mutationError }] = useMutation(
    SendCommunicationDocument,
    {
      onCompleted: ({ sendCommunication: { result } }) => {
        if (result) {
          message.success(t('emails.sent'));
          form.resetFields();
        }
      },
    }
  );

  useDisplayGraphQLErrors(mutationError);

  const handleSubmit: FormProps['onFinish'] = (values) => {
    sendCommunication({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Flex vertical gap="middle">
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} style={{ margin: 0 }}>
          {t('communication.page.title')}
        </Typography.Title>

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
      </Flex>

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
    </Flex>
  );
};

export default CommunicationPage;
