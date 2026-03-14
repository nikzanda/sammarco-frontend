import React, { PropsWithChildren } from 'react';
import { SocialYearContext, ISocialYearContext } from './SocialYearContext';
import { setSocialYear } from '../apollo';
import { getCurrentSocialYear } from '../utils';

const initialSocialYear = getCurrentSocialYear();

setSocialYear(initialSocialYear);

export const SocialYearProvider: React.FC<PropsWithChildren> = ({ children = undefined }) => {
  const [socialYear, setSocialYearState] = React.useState(initialSocialYear);

  const socialYearLabel = React.useMemo(() => {
    const result = `${socialYear}/${(socialYear + 1) % 100}`;
    return result;
  }, [socialYear]);

  const isCurrentYear = React.useMemo(() => {
    const result = socialYear === getCurrentSocialYear();
    return result;
  }, [socialYear]);

  const changeSocialYear = React.useCallback((year: number) => {
    setSocialYear(year);
    setSocialYearState(year);
  }, []);

  const value = React.useMemo<ISocialYearContext>(
    () => ({
      socialYear,
      socialYearLabel,
      isCurrentYear,
      changeSocialYear,
    }),
    [socialYear, socialYearLabel, isCurrentYear, changeSocialYear]
  );

  return <SocialYearContext.Provider value={value}>{children}</SocialYearContext.Provider>;
};
