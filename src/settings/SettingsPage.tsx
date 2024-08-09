import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSave } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import { Space, Flex, Typography, Button, Tabs, Form, App, FormProps } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { AuthenticationContext } from '../contexts';
import { EmailSettingsForm, EmailTextsForm } from './components';
import { useDisplayGraphQLErrors } from '../hooks';

const DEFAULT_TAB = 'email-settings';

const SettingsPage: React.FC = () => {
  const { currentUser } = React.useContext(AuthenticationContext);
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = React.useState<string>(searchParams.get('tab') || DEFAULT_TAB);

  React.useEffect(() => {
    searchParams.set('tab', tab);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, tab]);

  // const initialValues = React.useMemo(() => {
  //   if (!currentUser!.emailSettings) {
  //     return {
  //       emailSettings: { secure: false, ignoreTLS: false },
  //     };
  //   }
  //   return currentUser;
  // }, [currentUser]);

  // const [updateUser, { loading, error }] = useUserUpdateMutation({
  //   refetchQueries: ['Me'],
  //   onCompleted: () => {
  //     message.success(t('settings.saved'));
  //   },
  // });

  // useDisplayGraphQLErrors(error);

  // const handleFinish: FormProps['onFinish'] = (values) => {
  //   updateUser({
  //     variables: {
  //       input: values,
  //     },
  //   });
  // };

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
          // loading={loading}
        >
          {t('commons.save')}
        </Button>
      </Flex>

      <Form
        id="form"
        // initialValues={initialValues}
        layout="vertical"
        autoComplete="off"
        // onFinish={handleFinish}
      >
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
          ]}
        />
      </Form>
    </Space>
  );
};

export default SettingsPage;
