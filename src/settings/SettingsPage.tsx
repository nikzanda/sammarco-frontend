import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSave } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { Space, Flex, Typography, Button, Tabs, Form, App } from 'antd';
import { AuthenticationContext } from '../contexts';
import { EmailSettingsForm } from './components';
import { useUserUpdateMutation } from '../generated/graphql';
import { useDisplayGraphQLErrors } from '../hooks';

const SettingsPage: React.FC = () => {
  const { currentUser } = React.useContext(AuthenticationContext);
  const { t } = useTranslation();
  const { message } = App.useApp();

  const initialValues = React.useMemo(() => {
    if (!currentUser!.emailSettings) {
      return {
        emailSettings: { secure: false, ignoreTLS: false },
      };
    }
    return currentUser;
  }, [currentUser]);

  const [updateUser, { loading, error }] = useUserUpdateMutation({
    refetchQueries: ['Me'],
    onCompleted: () => {
      message.success(t('saved'));
    },
  });

  useDisplayGraphQLErrors(error);

  const handleFinish = (values: any) => {
    updateUser({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={2}>{t('settings.name')}</Typography.Title>
        <Button
          htmlType="submit"
          form="form"
          type="primary"
          size="large"
          icon={<Icon component={FaSave} />}
          loading={loading}
        >
          {t('commons.save')}
        </Button>
      </Flex>

      <Form id="form" initialValues={initialValues} layout="vertical" autoComplete="off" onFinish={handleFinish}>
        <Tabs
          items={[
            {
              label: t('settings.tab.emailSettings'),
              key: 'email-settings',
              children: <EmailSettingsForm />,
            },
          ]}
        />
      </Form>
    </Space>
  );
};

export default SettingsPage;
