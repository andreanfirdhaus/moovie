import { useState, useRef, useEffect } from 'react';
import { Check, ArrowUpDown, ChevronDown } from 'lucide-react';
import { sortOptions } from '@/constants/sort-options';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '../ui/dropdown';
import { Button } from '../ui/button';

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
    mediaType?: 'movie' | 'tv';
    variant?: 'dropdown' | 'list';
}

function SortTrigger() {
    const { isOpen } = useDropdown();
    return (
        <DropdownTrigger asChild>
            <Button
                variant='ghost'
                size='sm'
                rounded='lg'
                rightIcon={
                    <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                }>
                <ArrowUpDown size={14} />
                <span>Sort by</span>
            </Button>
        </DropdownTrigger>
    );
}

export default function SortDropdown({
    value,
    onChange,
    mediaType = 'movie',
    variant = 'dropdown',
}: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // sort options for TV shows
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
        <Dropdown>
            <SortTrigger />
            <DropdownMenu align='right' className='w-56 p-0 overflow-hidden'>
                {options.map((option) => {
                    const isSelected = option.value === value;
                    return (
                        <DropdownItem
                            key={option.value}
                            onSelect={() => onChange(option.value)}
                            className={`${
                                isSelected ?
                                    'bg-brand/15 text-brand-light font-medium hover:bg-brand/20 hover:text-brand-light focus:bg-brand/20 focus:text-brand-light'
                                :   ''
                            }`}>
                            <span>{option.label}</span>
                            {isSelected && <Check size={14} className='text-brand-light shrink-0' />}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </Dropdown>
    );
}
