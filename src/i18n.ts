import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import it from './locales/it-IT.json';

const resources = {
  it: {
    translations: {
      ...it,
    },
  },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  defaultNS: 'translations',
  resources,
  lng: 'it',
  fallbackLng: 'it',
});

export default i18n;
