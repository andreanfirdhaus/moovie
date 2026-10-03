import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/langContext';
import { Button } from '@/components/ui/button';

interface LanguageDropdownProps {
    position?: 'right-side' | 'top-side' | 'bottom';
}

export function LanguageDropdown({ position = 'bottom' }: LanguageDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getPositionClasses = () => {
        switch (position) {
            case 'right-side':
                return 'right-full top-0 mr-2';
            case 'top-side':
                return '-right-2 bottom-full mb-2';
            default:
                return 'right-0 top-full mt-2';
        }
    };

    return (
        <div ref={dropdownRef} className='relative w-full'>
            <Button
                variant='outline'
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label='Select language'
                className='flex items-center justify-between w-full h-11 px-3 text-sm text-foreground bg-transparent rounded-xl border-0 hover:bg-white/5'>
                <div className='flex items-center gap-2 min-w-0 pr-2'>
                    <span className='text-lg leading-none flex-shrink-0'>{currentLanguage.flag}</span>
                    <span className='font-medium truncate'>{currentLanguage.nativeLabel || currentLanguage.label}</span>
                </div>

                <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={`flex-shrink-0 text-foreground-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-foreground' : ''}`}
                />
            </Button>

            {isOpen && (
                <div
                    className={`absolute w-64 p-1.5 bg-surface-raised border border-border rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${getPositionClasses()}`}>
                    <div className='flex flex-col gap-0.5'>
                        {availableLanguages.map((lang) => {
                            const isSelected = currentLanguage.code === lang.code;
                            return (
                                <button
                                    key={lang.code}
                                    type='button'
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                                        isSelected ?
                                            'bg-surface-hover text-foreground font-semibold'
                                        :   'text-foreground-secondary hover:bg-surface-hover/50 hover:text-foreground'
                                    }`}>
                                    <span className='text-xl flex-shrink-0 w-6 text-center'>{lang.flag}</span>

                                    <div className='flex flex-col flex-1 min-w-0 pr-2'>
                                        <span className='text-sm leading-tight truncate'>{lang.nativeLabel}</span>
                                        <span
                                            className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-foreground-muted' : 'text-foreground-muted/70'}`}>
                                            {lang.label}
                                        </span>
                                    </div>

                                    {isSelected && (
                                        <Check size={16} strokeWidth={2} className='flex-shrink-0 text-white ml-auto' />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
