import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import id from './locales/id.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';

const resources = {
    en: { translation: en },
    id: { translation: id },
    ko: { translation: ko },
    ja: { translation: ja },
};

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('moovie_language') || 'en' : 'en';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage'],
            lookupLocalStorage: 'moovie_language',
            caches: ['localStorage'],
        },
    });

export default i18n;
