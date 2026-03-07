import { useState, useRef, useEffect } from 'react';
import { Check, ArrowUpDown } from 'lucide-react';

export interface SortOption {
    value: string;
    label: string;
}

export const sortOptions: SortOption[] = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'primary_release_date.desc', label: 'Newest Releases' },
    { value: 'primary_release_date.asc', label: 'Oldest Releases' },
    { value: 'title.asc', label: 'Title (A-Z)' },
    { value: 'title.desc', label: 'Title (Z-A)' },
];

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
    mediaType?: 'movie' | 'tv';
    variant?: 'dropdown' | 'list';
}

export default function SortDropdown({
    value,
    onChange,
    mediaType = 'movie',
    variant = 'dropdown',
}: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Adjust sort options for TV shows
    const options =
        mediaType === 'tv' ?
            sortOptions.map((opt) => {
                if (opt.value.includes('primary_release_date')) {
                    return {
                        value: opt.value.replace('primary_release_date', 'first_air_date'),
                        label: opt.label.replace('Release Date', 'First Air Date'),
                    };
                }
                if (opt.value.includes('title')) {
                    return {
                        value: opt.value.replace('title', 'name'),
                        label: opt.label,
                    };
                }
                return opt;
            })
        :   sortOptions;

    // close dropdown
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

    if (variant === 'list') {
        return (
            <div className='flex flex-col gap-0.5'>
                {options.map((option) => {
                    const isSelected = option.value === value;
                    return (
                        <button
                            key={option.value}
                            onClick={() => onChange(option.value)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors 
                                ${
                                    isSelected ?
                                        'bg-brand/15 text-brand-light font-medium'
                                    :   'text-zinc-400 hover:bg-surface-3 hover:text-zinc-200 font-medium'
                                }`}>
                            <span>{option.label}</span>
                            {isSelected && <Check size={14} className='text-brand-light flex-shrink-0' />}
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className='relative' ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-1.5 px-3.5 py-2.5 bg-surface-2 hover:bg-surface-3 text-zinc-300 rounded-lg text-sm font-medium transition-colors'>
                <ArrowUpDown size={16} />
                <span>Sort by</span>
            </button>

            {isOpen && (
                <div className='absolute right-0 mt-2 w-56 bg-surface-2 border border-surface-4 rounded-lg shadow-xl overflow-hidden z-50'>
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${isSelected ? 'bg-brand text-zinc-200' : 'text-zinc-300 hover:bg-surface-3'}`}>
                                <span>{option.label}</span>
                                {isSelected && <Check size={16} />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
