import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSave } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { Space, Flex, Typography, Button, Tabs, Form, App, FormProps } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { SettingsContext } from '../contexts';
import { EmailSettingsForm, EmailTextsForm, ReminderSendForm } from './components';
import { useDisplayGraphQLErrors } from '../hooks';
import { useSettingUpdateMutation } from '../generated/graphql';

const DEFAULT_TAB = 'email-settings';

const SettingsPage: React.FC = () => {
  const { settings } = React.useContext(SettingsContext);
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = React.useState<string>(searchParams.get('tab') || DEFAULT_TAB);

  React.useEffect(() => {
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, tab]);

  const [updateUser, { loading: mutationLoading, error: mutationError }] = useSettingUpdateMutation({
    refetchQueries: ['Me'],
    onCompleted: () => {
      message.success(t('settings.saved'));
    },
  });

  useDisplayGraphQLErrors(mutationError);

  const handleFinish: FormProps['onFinish'] = (values) => {
    updateUser({
      variables: {
        input: values,
      },
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={3}>{t('settings.name')}</Typography.Title>
        <Button
          htmlType="submit"
          form="form"
          type="primary"
          size="large"
          icon={<Icon component={FaSave} />}
          loading={mutationLoading}
        >
          {t('commons.save')}
        </Button>
      </Flex>

      <Form id="form" initialValues={settings} layout="vertical" autoComplete="off" onFinish={handleFinish}>
        <Tabs
          activeKey={tab}
          onChange={setTab}
          items={[
            {
              label: t('settings.tab.emailSettings'),
              key: 'email-settings',
              children: <EmailSettingsForm />,
            },
            {
              label: t('settings.tab.emailTexts'),
              key: 'email-texts',
              children: <EmailTextsForm />,
            },
            {
              label: t('settings.tab.reminderSend'),
              key: 'reminder-send',
              children: <ReminderSendForm />,
            },
          ]}
        />
      </Form>
    </Space>
  );
};

export default SettingsPage;
