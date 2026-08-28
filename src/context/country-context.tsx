import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { COUNTRIES, DEFAULT_COUNTRY, type CountryOption } from '@/constants/countries';
import { queryClient } from '@/config/query-client';

const STORAGE_KEY = 'moovie_selected_country';

interface CountryContextType {
    selectedCountry: string;
    currentCountry: CountryOption;
    setCountry: (code: string) => void;
    isAllCountries: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
    const [selectedCountry, setSelectedCountryState] = useState<string>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && COUNTRIES.some((c) => c.code === saved)) {
                return saved;
            }
        } catch {
            // LocalStorage might be disabled or unavailable
        }
        return DEFAULT_COUNTRY;
    });

    const setCountry = (code: string) => {
        setSelectedCountryState(code);
        try {
            localStorage.setItem(STORAGE_KEY, code);
        } catch {
            // Ignore error
        }
        // Invalidate all active queries so data and descriptions immediately refresh in the new language/region
        queryClient.invalidateQueries();
    };

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, selectedCountry);
        } catch {
            // Ignore error
        }
    }, [selectedCountry]);

    const currentCountry = useMemo(() => {
        return COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];
    }, [selectedCountry]);

    const isAllCountries = selectedCountry === 'ALL';

    const value = useMemo(
        () => ({
            selectedCountry,
            currentCountry,
            setCountry,
            isAllCountries,
        }),
        [selectedCountry, currentCountry, isAllCountries]
    );

    return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry() {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error('useCountry must be used within a CountryProvider');
    }
    return context;
}
