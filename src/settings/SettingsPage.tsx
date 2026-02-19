import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSave } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { Card, Flex, Typography, Button, Tabs, Form, App, FormProps, Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { SettingsContext } from '../contexts';
import { EmailSettingsForm, EmailTextsForm, SettingsForm } from './components';
import { useDisplayGraphQLErrors } from '../hooks';
import { useMutation } from '@apollo/client/react';
import { SettingUpdateDocument } from '../gql/graphql';

const DEFAULT_TAB = 'general';

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

  const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(SettingUpdateDocument, {
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

  if (!settings) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }

  return (
    <Flex vertical gap="middle">
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} style={{ margin: 0 }}>
          {t('settings.name')}
        </Typography.Title>
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

      <Card styles={{ body: { paddingTop: 0 } }}>
        <Form id="form" initialValues={settings} layout="vertical" autoComplete="off" onFinish={handleFinish}>
          <Tabs
            activeKey={tab}
            onChange={setTab}
            items={[
              {
                label: t('settings.tab.general'),
                key: 'general',
                children: <SettingsForm />,
              },
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
            ]}
          />
        </Form>
      </Card>
    </Flex>
  );
};

export default SettingsPage;
