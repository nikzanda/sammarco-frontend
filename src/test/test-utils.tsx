import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { MockLink } from '@apollo/client/testing';
import { App } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import it from '../locales/it-IT.json';
import { SocialYearContext, ISocialYearContext } from '../contexts/SocialYearContext';
import { SettingsContext, ISettingsContext } from '../contexts/SettingsContext';

// Initialize i18n for tests
const testI18n = i18n.createInstance();
testI18n.use(initReactI18next).init({
  defaultNS: 'translations',
  resources: {
    it: {
      translations: { ...it },
    },
  },
  lng: 'it',
  fallbackLng: 'it',
});

interface TestProviderOptions {
  mocks?: MockLink.MockedResponse[];
  socialYear?: Partial<ISocialYearContext>;
  settings?: Partial<ISettingsContext>;
  route?: string;
}

const defaultSocialYear: ISocialYearContext = {
  socialYear: 2025,
  socialYearLabel: '2025 - 2026',
  isCurrentYear: true,
  changeSocialYear: () => {},
};

const defaultSettings: ISettingsContext = {
  validEmailSettings: true,
  settings: {
    daysBeforeMedicalCertificateExpiresToSendEmail: [30, 10],
    attendancesPerMonthToSendReminder: 4,
    associationName: 'Test Association',
    associationAddress: 'Via Test 1',
    associationTaxCode: '12345678901',
  } as ISettingsContext['settings'],
};

const createTestProviders = ({
  mocks = [],
  socialYear = {},
  settings = {},
  route = '/',
}: TestProviderOptions = {}): React.FC<{ children: React.ReactNode }> => {
  const TestProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MockedProvider mocks={mocks}>
      <I18nextProvider i18n={testI18n}>
        <MemoryRouter initialEntries={[route]}>
          <SocialYearContext.Provider value={{ ...defaultSocialYear, ...socialYear }}>
            <SettingsContext.Provider value={{ ...defaultSettings, ...settings }}>
              <App>{children}</App>
            </SettingsContext.Provider>
          </SocialYearContext.Provider>
        </MemoryRouter>
      </I18nextProvider>
    </MockedProvider>
  );
  return TestProviders;
};

const customRender = (ui: React.ReactElement, options?: TestProviderOptions & Omit<RenderOptions, 'wrapper'>) => {
  const { mocks, socialYear, settings, route, ...renderOptions } = options || {};
  const result = render(ui, {
    wrapper: createTestProviders({ mocks, socialYear, settings, route }),
    ...renderOptions,
  });
  return result;
};

export { customRender as render, createTestProviders };
