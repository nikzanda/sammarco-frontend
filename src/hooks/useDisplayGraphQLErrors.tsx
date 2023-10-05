import React from 'react';
import { ApolloError } from '@apollo/client';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

const useDisplayGraphQLErrors = (errors: (ApolloError | undefined)[]) => {
  const { message } = App.useApp();
  const { t } = useTranslation();

  React.useEffect(() => {
    errors.forEach((error) => {
      if (!error) {
        return;
      }

      if (error.graphQLErrors?.length) {
        message.error(error.graphQLErrors.map((e) => t(`errors.${e.message}`)).join('\n'));
      } else if (error.clientErrors?.length) {
        message.error(error.clientErrors.map((e) => t(`errors.${e.message}`)).join('\n'));
      } else {
        const msg = t(`errors.${error.message}`);
        message.error(msg);
      }
    });
  }, [errors, message, t]);
};

export default useDisplayGraphQLErrors;
