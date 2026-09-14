import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';
import { LANGUAGES, getLanguageByCode, type LanguageOption } from '@/constants/languages';

interface LanguageContextType {
    currentLanguage: LanguageOption;
    setLanguage: (code: string) => void;
    availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentLanguage, setCurrentLanguageState] = useState<LanguageOption>(() => {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('moovie_language') : null;
        return getLanguageByCode(saved || i18n.language || 'en');
    });

    const setLanguage = (code: string) => {
        const matched = getLanguageByCode(code);
        setCurrentLanguageState(matched);
        if (typeof window !== 'undefined') {
            localStorage.setItem('moovie_language', matched.code);
        }
        void i18n.changeLanguage(matched.code);
    };

    useEffect(() => {
        const handleLanguageChanged = (lng: string) => {
            const matched = getLanguageByCode(lng);
            setCurrentLanguageState(matched);
        };

        i18n.on('languageChanged', handleLanguageChanged);
        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, []);

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                setLanguage,
                availableLanguages: LANGUAGES,
            }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
