import React from 'react';

export interface ISocialYearContext {
  socialYear: number;
  socialYearLabel: string;
  isCurrentYear: boolean;
  changeSocialYear: (year: number) => void;
}

export const SocialYearContext = React.createContext<ISocialYearContext>({
  socialYear: 0,
  socialYearLabel: '',
  isCurrentYear: true,
  changeSocialYear: () => {},
});
