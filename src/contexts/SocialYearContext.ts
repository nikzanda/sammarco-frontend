import React from 'react';

export interface ISocialYearContext {
  socialYear: number;
  socialYearLabel: string;
}

export const SocialYearContext = React.createContext<ISocialYearContext>({
  socialYear: 0,
  socialYearLabel: '',
});
