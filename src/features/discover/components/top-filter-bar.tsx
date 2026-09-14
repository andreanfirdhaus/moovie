import React from 'react';
import { RotateCcw, Check, Film, Tv, Globe, Calendar, ArrowDownUp, Tv2, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WATCH_PROVIDERS } from '@/constants/watch-providers';
import { COUNTRIES } from '@/constants/countries';
import type { Genres } from '@/types/tmdb/media-detail.ts';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';

interface TopFilterBarProps {
    mediaType: 'movie' | 'tv';
    onMediaTypeChange: (type: 'movie' | 'tv') => void;
    selectedProviders: number[];
    onProviderChange: (providerId: number | null) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    fromYear: string;
    onFromYearChange: (year: string) => void;
    toYear: string;
    onToYearChange: (year: string) => void;
    country: string;
    onCountryChange: (countryCode: string) => void;
    genres: Genres[];
    selectedGenres: number[];
    onGenreToggle: (genreId: number) => void;
    isLoadingGenres?: boolean;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1969 }, (_, i) => String(currentYear - i));

function FilterTrigger({
    icon: Icon,
    label,
    className,
    customIcon,
}: {
    icon: React.ElementType;
    label: React.ReactNode;
    className?: string;
    customIcon?: React.ReactNode;
}) {
    const { isOpen } = useDropdown();
    return (
        <DropdownTrigger asChild>
            <Button
                type='button'
                variant='ghost'
                className={cn(
                    'flex h-9 items-center gap-2 rounded-lg border border-border-subtle bg-surface-base px-3.5 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-surface-elevated hover:text-foreground',
                    className
                )}>
                {customIcon ?
                    <span className='flex-shrink-0 flex items-center justify-center'>{customIcon}</span>
                :   Icon && <Icon size={14} className='flex-shrink-0' />}
                <span className='tracking-wide truncate'>{label}</span>
                <ChevronDown
                    size={13}
                    strokeWidth={2.5}
                    className={cn(
                        'text-foreground-muted transition-transform duration-200 flex-shrink-0 ml-auto',
                        isOpen && 'rotate-180 text-foreground'
                    )}
                />
            </Button>
        </DropdownTrigger>
    );
}

export function TopFilterBar({
    mediaType,
    onMediaTypeChange,
    selectedProviders,
    onProviderChange,
    sortBy,
    onSortChange,
    fromYear,
    onFromYearChange,
    toYear,
    onToYearChange,
    country,
    onCountryChange,
    genres,
    selectedGenres,
    onGenreToggle,
    isLoadingGenres = false,
    onClearFilters,
    hasActiveFilters,
}: TopFilterBarProps) {
    const { t } = useTranslation();

    const sortOptions = [
        { value: 'popularity.desc', label: t('discover.popular') },
        // { value: 'popularity.asc', label: t('discover.popularAsc') },
        { value: 'vote_average.desc', label: t('discover.topRated') },
        {
            value: mediaType === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc',
            // label: t('discover.newest'),
            label: t('discover.releaseDate'),
        },
        // {
        //     value: mediaType === 'movie' ? 'primary_release_date.asc' : 'first_air_date.asc',
        //     label: t('discover.oldest'),
        // },
    ];

    // const selectedProviderObj = WATCH_PROVIDERS.find((p) => p.id === selectedProviders[0]);
    const selectedProviderObj = WATCH_PROVIDERS.find((p) => Number(p.id) === Number(selectedProviders[0]));
    const selectedCountryObj = COUNTRIES.find((c) => c.code === country);
    const selectedSortObj = sortOptions.find((s) => s.value === sortBy);

    return (
        <div className='w-full space-y-2 mb-6'>
            {/* row 1: dropdown filters bar */}
            <div className='relative z-10 flex items-center gap-2.5 p-3 rounded-2xl bg-surface-raised/80 border border-border-subtle backdrop-blur-md shadow-sm overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                {/* 1. type (movies/series) */}
                <Dropdown className='w-fit'>
                    <FilterTrigger
                        icon={mediaType === 'movie' ? Film : Tv}
                        label={mediaType === 'movie' ? t('discover.discoverMovies') : t('discover.discoverTv')}
                    />

                    <DropdownMenu align='left' className='w-44'>
                        {[
                            { value: 'movie', label: t('discover.discoverMovies') },
                            { value: 'tv', label: t('discover.discoverTv') },
                        ].map((item) => {
                            const isSelected = mediaType === item.value;
                            return (
                                <DropdownItem
                                    key={item.value}
                                    onSelect={() => onMediaTypeChange(item.value as 'movie' | 'tv')}
                                    className={cn(
                                        'justify-between',
                                        isSelected && 'bg-surface-hover text-foreground font-semibold'
                                    )}>
                                    <span>{item.label}</span>
                                    {isSelected && <Check size={16} strokeWidth={2} className='ml-2' />}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>

                {/* 2. watch providers */}
                <Dropdown className='w-fit'>
                    <FilterTrigger
                        icon={Tv2}
                        customIcon={
                            selectedProviderObj?.logo_path ?
                                <img
                                    src={`https://image.tmdb.org/t/p/w92${selectedProviderObj.logo_path}`}
                                    alt={selectedProviderObj.name}
                                    className='size-4 rounded object-cover'
                                />
                            :   undefined
                        }
                        label={selectedProviderObj ? selectedProviderObj.name : t('discover.allProviders')}
                        className='max-w-[180px]'
                    />
                    <DropdownMenu align='left' className='w-56'>
                        <DropdownItem
                            onSelect={() => onProviderChange(null)}
                            className={cn(
                                'justify-between',
                                !selectedProviders[0] && 'bg-surface-hover text-foreground font-semibold'
                            )}>
                            <span>{t('discover.allProviders')}</span>
                            {!selectedProviders[0] && <Check size={16} strokeWidth={2} className='ml-2' />}
                        </DropdownItem>
                        {WATCH_PROVIDERS.map((provider) => {
                            // const isSelected = selectedProviders[0] === provider.id;
                            const isSelected = Number(selectedProviders[0]) === Number(provider.id);
                            return (
                                <DropdownItem
                                    key={provider.id}
                                    onSelect={() => onProviderChange(provider.id)}
                                    className={cn(
                                        'justify-between',
                                        isSelected && 'bg-surface-hover text-foreground font-semibold'
                                    )}>
                                    <span className='truncate'>{provider.name}</span>
                                    {isSelected && <Check size={16} strokeWidth={2} className='ml-2' />}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>

                {/* 3. sort by */}
                <Dropdown className='w-fit'>
                    <FilterTrigger
                        icon={ArrowDownUp}
                        label={selectedSortObj ? selectedSortObj.label : t('discover.popular')}
                    />
                    <DropdownMenu align='left' className='w-48'>
                        {sortOptions.map((item) => {
                            const isSelected = sortBy === item.value;
                            return (
                                <DropdownItem
                                    key={item.value}
                                    onSelect={() => onSortChange(item.value)}
                                    className={cn(
                                        'justify-between',
                                        isSelected && 'bg-surface-hover text-foreground font-semibold'
                                    )}>
                                    <span>{item.label}</span>
                                    {isSelected && <Check size={16} strokeWidth={2} className='ml-2' />}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>

                {/* 4. from year */}
                <Dropdown className='w-fit'>
                    <FilterTrigger
                        icon={Calendar}
                        label={
                            <span>
                                <span className='text-foreground-muted font-normal mr-1'>From:</span>
                                {fromYear || 'All'}
                            </span>
                        }
                    />
                    <DropdownMenu align='left' className='w-36 max-h-64 overflow-y-auto'>
                        <DropdownItem
                            onSelect={() => onFromYearChange('')}
                            className={cn(
                                'justify-between',
                                !fromYear && 'bg-surface-hover text-foreground font-semibold'
                            )}>
                            <span>All</span>
                            {!fromYear && <Check size={16} strokeWidth={2} className='ml-2' />}
                        </DropdownItem>
                        {YEARS.map((yr) => {
                            const isSelected = fromYear === yr;
                            return (
                                <DropdownItem
                                    key={yr}
                                    onSelect={() => onFromYearChange(yr)}
                                    className={cn(
                                        'justify-between',
                                        isSelected && 'bg-surface-hover text-foreground font-semibold'
                                    )}>
                                    <span>{yr}</span>
                                    {isSelected && <Check size={16} strokeWidth={2} className='ml-2' />}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>

                {/* 5. to year */}
                <Dropdown className='w-fit'>
                    <FilterTrigger
                        icon={Calendar}
                        label={
                            <span>
                                <span className='text-foreground-muted font-normal mr-1'>To:</span>
                                {toYear || 'All'}
                            </span>
                        }
                    />
                    <DropdownMenu align='left' className='w-36 max-h-64 overflow-y-auto'>
                        <DropdownItem
                            onSelect={() => onToYearChange('')}
                            className={cn(
                                'justify-between',
                                !toYear && 'bg-surface-hover text-foreground font-semibold'
                            )}>
                            <span>All</span>
                            {!toYear && <Check size={16} strokeWidth={2} className='ml-2' />}
                        </DropdownItem>
                        {YEARS.map((yr) => {
                            const isSelected = toYear === yr;
                            return (
                                <DropdownItem
                                    key={yr}
                                    onSelect={() => onToYearChange(yr)}
                                    className={cn(
                                        'justify-between',
                                        isSelected && 'bg-surface-hover text-foreground font-semibold'
                                    )}>
                                    <span>{yr}</span>
                                    {isSelected && <Check size={16} strokeWidth={2} className='ml-2' />}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>

                {/* 6. country/region */}
                <Dropdown className='w-fit'>
                    <FilterTrigger
                        icon={Globe}
                        customIcon={
                            selectedCountryObj?.flag ?
                                <span className='text-sm leading-none'>{selectedCountryObj.flag}</span>
                            :   undefined
                        }
                        label={selectedCountryObj ? `${selectedCountryObj.name}` : 'Country'}
                        className='max-w-[180px]'
                    />

                    <DropdownMenu align='left' className='w-60 max-h-72 overflow-y-auto'>
                        {COUNTRIES.map((c) => {
                            const isSelected = country === c.code;
                            return (
                                <DropdownItem
                                    key={c.code}
                                    onSelect={() => onCountryChange(c.code)}
                                    className={cn(
                                        'justify-between',
                                        isSelected && 'bg-surface-hover text-foreground font-semibold'
                                    )}>
                                    <span className='truncate'>{c.name}</span>
                                    {isSelected && <Check size={16} strokeWidth={2} className='ml-2' />}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>

                {/* reset button */}
                {hasActiveFilters && (
                    <button
                        type='button'
                        onClick={onClearFilters}
                        className='hidden lg:flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-primary-accent/10 border border-primary-accent/30 hover:bg-primary-accent/20 text-xs font-semibold transition-colors flex-shrink-0 ml-auto'>
                        <RotateCcw size={13} />
                        <span>{t('discover.reset')}</span>
                    </button>
                )}
            </div>

            {/* row 2: inline multi-select senres bar */}
            <div className='w-full flex items-center overflow-x-auto lg:overflow-x-visible lg:flex-wrap gap-2 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                {isLoadingGenres ?
                    Array.from({ length: 12 }).map((_, idx) => (
                        <div key={idx} className='h-8 w-20 bg-surface-raised rounded-full animate-pulse' />
                    ))
                :   genres.map((genre) => {
                        const isSelected = selectedGenres.includes(genre.id);
                        return (
                            <button
                                key={genre.id}
                                type='button'
                                onClick={() => onGenreToggle(genre.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 whitespace-nowrap w-max ${
                                    isSelected ?
                                        'bg-primary-accent text-white font-semibold shadow-md shadow-primary-accent/25 ring-1 ring-primary-accent'
                                    :   'bg-surface-raised/70 border border-border-subtle text-foreground-secondary hover:bg-surface-hover hover:text-foreground'
                                }`}>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                                <span>{genre.name}</span>
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
}
