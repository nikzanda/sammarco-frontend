import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Flex, theme } from 'antd';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RegistrationForm } from './components';

const RegistrationPage: React.FC = () => {
  const { socialYear: socialYearParam } = useParams();
  const socialYear = parseInt(socialYearParam!, 10);
  const socialYearShort = String(socialYear + 1).slice(-2);
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
        backgroundColor: token.colorBgLayout,
        padding: 24,
      }}
    >
      <Card
        title={t('registration.title', { socialYear, socialYearShort })}
        styles={{
          header: {
            textAlign: 'center',
            fontSize: 20,
          },
        }}
        style={{ width: 800, maxWidth: '90vw' }}
      >
        <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY}>
          <RegistrationForm />
        </GoogleReCaptchaProvider>
      </Card>
    </Flex>
  );
};

export default RegistrationPage;
