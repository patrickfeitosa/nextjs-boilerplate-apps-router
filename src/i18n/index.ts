import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enCommon from './locales/en/common.json';
import enMain from './locales/en/main.json';
import ptCommon from './locales/pt/common.json';
import ptMain from './locales/pt/main.json';

export const defaultNS = 'common';

export const resources = {
  en: { common: enCommon, main: enMain },
  pt: { common: ptCommon, main: ptMain },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    defaultNS,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    lng: 'en',
    resources,
  });
}

export default i18n;
