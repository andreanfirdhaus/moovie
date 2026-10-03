export interface CountryOption {
    code: string;
    name: string;
    flag: string;
    language: string;
}

export const COUNTRIES: CountryOption[] = [
    { code: 'ALL', name: 'All Countries', flag: '', language: 'en-US' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩', language: 'id-ID' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', language: 'ja-JP' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', language: 'ko-KR' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭', language: 'th-TH' },
    { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en-US' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', language: 'en-GB' },
];

export const DEFAULT_COUNTRY = 'US';

export const getCountryByCode = (code: string): CountryOption => {
    return COUNTRIES.find((c) => c.code === code) || COUNTRIES[0];
};

export const getSelectedCountryCode = (): string => {
    try {
        const saved = localStorage.getItem('moovie_selected_country');
        if (saved && COUNTRIES.some((c) => c.code === saved)) {
            return saved;
        }
    } catch {
        // LocalStorage unavailable
    }
    return DEFAULT_COUNTRY;
};
