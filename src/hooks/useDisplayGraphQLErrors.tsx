import React from 'react';
import { ApolloError } from '@apollo/client';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

const useDisplayGraphQLErrors = (...errors: (ApolloError | undefined)[]) => {
  const { message } = App.useApp();
  const { t } = useTranslation();

  React.useEffect(() => {
    errors.forEach((error) => {
      if (!error) {
        return;
      }

      if (error.graphQLErrors?.length) {
        message.error(
          error.graphQLErrors
            .map((e) => {
              const errorResponse = e.extensions?.response as any;
              if (!errorResponse) {
                return t(`errors.${e.message}`);
              }

              const errorData = errorResponse.body.errors[0];
              const message: string = errorData.message || e.message;
              let args: any;
              switch (errorData.extensions.code) {
                case 'NOT_FOUND': {
                  const count = errorData.extensions.multiple ? 2 : 1;
                  args = { count, type: t(`types.${errorData.extensions.type}`, { count }) };
                }
              }
              return t(`errors.${message}`, args);
            })
            .join('\n')
        );
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
