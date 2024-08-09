import React, { PropsWithChildren } from 'react';
import { SettingQuery, useSettingQuery } from '../generated/graphql';
import { useDisplayGraphQLErrors } from '../hooks';

interface ISettingsContext {
  settings?: SettingQuery['setting'];
}

export const SettingsContext = React.createContext<ISettingsContext>({});

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: queryData, loading: queryLoading, error: queryError } = useSettingQuery();

  useDisplayGraphQLErrors(queryError);

  const settings = React.useMemo(() => {
    if (!queryLoading && !queryError && queryData) {
      return queryData.setting;
    }
    return undefined;
  }, [queryData, queryError, queryLoading]);

  const value = React.useMemo(() => {
    if (settings) {
      return {
        settings,
      };
    }
    return {};
  }, [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const { Consumer: SettingsConsumer } = SettingsContext;
