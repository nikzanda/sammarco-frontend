import React from 'react';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('commons.pageNotFound')}
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          {t('commons.goBack')}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
