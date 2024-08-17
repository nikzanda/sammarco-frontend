import React, { PropsWithChildren } from 'react';
import { SettingQuery, useSettingQuery } from '../generated/graphql';
import { useDisplayGraphQLErrors } from '../hooks';

interface ISettingsContext {
  settings?: SettingQuery['setting'];
  validEmailSettings: boolean;
}

export const SettingsContext = React.createContext<ISettingsContext>({
  validEmailSettings: false,
});

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: queryData, loading: queryLoading, error: queryError } = useSettingQuery();

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

export const { Consumer: SettingsConsumer } = SettingsContext;
