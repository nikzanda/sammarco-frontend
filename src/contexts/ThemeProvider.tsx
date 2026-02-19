import React, { PropsWithChildren } from 'react';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import itIT from 'antd/es/locale/it_IT';
import { IThemeContext, ThemeContext } from './ThemeContext';

const THEME_STORAGE_KEY = 'theme';

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children = undefined }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = React.useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
      return next;
    });
  }, []);

  const value = React.useMemo<IThemeContext>(
    () => ({
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        locale={itIT}
        theme={{
          cssVar: {},
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
