import React, { PropsWithChildren } from 'react';
import { App as AntdApp, ConfigProvider } from 'antd';
import itIT from 'antd/es/locale/it_IT';

interface IThemeContext {}

export const ThemeContext = React.createContext<IThemeContext>({});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const value = React.useMemo(() => {
    const result: IThemeContext = {};
    return result;
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider locale={itIT} theme={{ cssVar: true }}>
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const { Consumer: ThemeConsumer } = ThemeContext;
