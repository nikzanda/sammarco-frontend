import React, { PropsWithChildren } from 'react';
import { SocialYearContext, ISocialYearContext } from './SocialYearContext';

const socialYear = parseInt(import.meta.env.VITE_SOCIAL_YEAR, 10);
const socialYearLabel = `${socialYear}/${socialYear + 1}`;

export const SocialYearProvider: React.FC<PropsWithChildren> = ({ children = undefined }) => {
  const value = React.useMemo<ISocialYearContext>(
    () => ({
      socialYear,
      socialYearLabel,
    }),
    []
  );

  return <SocialYearContext.Provider value={value}>{children}</SocialYearContext.Provider>;
};
