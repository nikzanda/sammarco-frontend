import React, { PropsWithChildren } from 'react';
import { useQuery } from '@apollo/client/react';
import { SettingDocument } from '../gql/graphql';
import { useDisplayGraphQLErrors } from '../hooks';
import { SettingsContext } from './SettingsContext';

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children = undefined }) => {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(SettingDocument);

  useDisplayGraphQLErrors(queryError);

  const settings = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.setting;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const validEmailSettings = React.useMemo(() => {
    if (!settings) {
      return false;
    }

    const result = Object.values(settings.emailSettings).every(Boolean);
    return result;
  }, [settings]);

  const value = React.useMemo(() => {
    if (settings) {
      return {
        settings,
        validEmailSettings,
      };
    }
    return {
      validEmailSettings: false,
    };
  }, [settings, validEmailSettings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
