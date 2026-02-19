import React from 'react';
import { ErrorLike } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

const useDisplayGraphQLErrors = (...errors: (ErrorLike | undefined)[]) => {
  const { message } = App.useApp();
  const { t } = useTranslation();

  React.useEffect(() => {
    errors.forEach((error) => {
      if (!error) {
        return;
      }

      if (CombinedGraphQLErrors.is(error)) {
        message.error(
          error.errors
            .map((e) => {
              const errorResponse = e.extensions?.response as any;
              if (!errorResponse) {
                return t(`errors.${e.message}`);
              }

              const errorData = errorResponse.body.errors[0];
              const errorMessage: string = errorData.message || e.message;
              let args: any;
              switch (errorData.extensions.code) {
                case 'NOT_FOUND': {
                  const count = errorData.extensions.multiple ? 2 : 1;
                  args = { count, type: t(`types.${errorData.extensions.type}`, { count }) };
                }
              }
              return t(`errors.${errorMessage}`, args);
            })
            .join('\n')
        );
      } else {
        const msg = t(`errors.${error.message}`);
        message.error(msg);
      }
    });
  }, [errors, message, t]);
};

export default useDisplayGraphQLErrors;
