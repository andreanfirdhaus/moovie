export interface LanguageOption {
    code: string;
    label: string;
    nativeLabel: string;
    flag: string;
    tmdbLanguage: string;
}

export const LANGUAGES: LanguageOption[] = [
    {
        code: 'en',
        label: 'English',
        nativeLabel: 'English',
        flag: '🇺🇸',
        tmdbLanguage: 'en-US',
    },
    {
        code: 'id',
        label: 'Indonesian',
        nativeLabel: 'Indonesia',
        flag: '🇮🇩',
        tmdbLanguage: 'id-ID',
    },
    {
        code: 'ko',
        label: 'Korean',
        nativeLabel: '한국어',
        flag: '🇰🇷',
        tmdbLanguage: 'ko-KR',
    },
    {
        code: 'ja',
        label: 'Japanese',
        nativeLabel: '日本語',
        flag: '🇯🇵',
        tmdbLanguage: 'ja-JP',
    },
    {
        code: 'th',
        label: 'Thai',
        nativeLabel: 'ไทย',
        flag: '🇹🇭',
        tmdbLanguage: 'th-TH',
    },
    {
        code: 'fr',
        label: 'French',
        nativeLabel: 'Français',
        flag: '🇫🇷',
        tmdbLanguage: 'fr-FR',
    },
    {
        code: 'es',
        label: 'Spanish',
        nativeLabel: 'Español',
        flag: '🇪🇸',
        tmdbLanguage: 'es-ES',
    },
    {
        code: 'de',
        label: 'German',
        nativeLabel: 'Deutsch',
        flag: '🇩🇪',
        tmdbLanguage: 'de-DE',
    },
];

export const DEFAULT_LANGUAGE = 'en';

export const getLanguageByCode = (code: string): LanguageOption => {
    return LANGUAGES.find((lang) => lang.code === code) || LANGUAGES[0];
};

export const getTmdbLanguage = (code: string): string => {
    const lang = getLanguageByCode(code);
    return lang.tmdbLanguage;
};
