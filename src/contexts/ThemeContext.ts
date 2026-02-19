import React from 'react';

export interface IThemeContext {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  isDarkMode: false,
  toggleTheme: () => {},
});
