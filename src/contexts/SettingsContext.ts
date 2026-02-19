import React from 'react';
import { SettingQuery } from '../gql/graphql';

export interface ISettingsContext {
  settings?: SettingQuery['setting'];
  validEmailSettings: boolean;
}

export const SettingsContext = React.createContext<ISettingsContext>({
  validEmailSettings: false,
});
