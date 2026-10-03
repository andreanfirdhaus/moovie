import { useSearchParams } from 'react-router-dom';

interface UseDiscoverFiltersProps {
    defaultMediaType?: string;
}

export function useDiscoverFilters({ defaultMediaType = 'movie' }: UseDiscoverFiltersProps = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const mediaType = (searchParams.get('type') || defaultMediaType || 'movie') as 'movie' | 'tv';
    const currentPage = parseInt(searchParams.get('page') || '1');
    const selectedGenres =
        searchParams.get('genres') ? searchParams.get('genres')!.split(',').map(Number).filter(Boolean) : [];

    // handle both "providers" and "provider" query parameters for backward compatibility
    const providerParam = searchParams.get('providers') || searchParams.get('provider');
    const selectedProviders = providerParam ? providerParam.split(',').map(Number).filter(Boolean) : [];

    const sortBy = searchParams.get('sort') || 'popularity.desc';
    const fromYear = searchParams.get('fromYear') || '';
    const toYear = searchParams.get('toYear') || '';
    const country = searchParams.get('country') || 'ALL';

    const updateParams = (patch: {
        type?: string;
        page?: number;
        genres?: number[];
        providers?: number[];
        sort?: string;
        fromYear?: string;
        toYear?: string;
        country?: string;
    }) => {
        const next = new URLSearchParams(searchParams);

        if (patch.type !== undefined) {
            if (patch.type && patch.type !== 'movie') {
                next.set('type', patch.type);
            } else {
                next.delete('type');
            }
        }

        const newPage = patch.page !== undefined ? patch.page : currentPage;
        if (newPage > 1) {
            next.set('page', String(newPage));
        } else {
            next.delete('page');
        }

        const newGenres = patch.genres !== undefined ? patch.genres : selectedGenres;
        if (newGenres.length > 0) {
            next.set('genres', newGenres.join(','));
        } else {
            next.delete('genres');
        }

        const newProviders = patch.providers !== undefined ? patch.providers : selectedProviders;
        if (newProviders.length > 0) {
            next.set('providers', newProviders.join(','));
        } else {
            next.delete('providers');
        }

        const newSort = patch.sort !== undefined ? patch.sort : sortBy;
        if (newSort && newSort !== 'popularity.desc') {
            next.set('sort', newSort);
        } else {
            next.delete('sort');
        }

        const newFromYear = patch.fromYear !== undefined ? patch.fromYear : fromYear;
        if (newFromYear) {
            next.set('fromYear', newFromYear);
        } else {
            next.delete('fromYear');
        }

        const newToYear = patch.toYear !== undefined ? patch.toYear : toYear;
        if (newToYear) {
            next.set('toYear', newToYear);
        } else {
            next.delete('toYear');
        }

        const newCountry = patch.country !== undefined ? patch.country : country;
        if (newCountry && newCountry !== 'ALL') {
            next.set('country', newCountry);
        } else {
            next.delete('country');
        }

        setSearchParams(next, { replace: true });
    };

    return {
        mediaType,
        currentPage,
        selectedGenres,
        selectedProviders,
        sortBy,
        fromYear,
        toYear,
        country,

        setMediaType: (type: 'movie' | 'tv') => {
            updateParams({ type, page: 1, genres: [] });
        },

        setCurrentPage: (page: number) => updateParams({ page }),

        setSelectedGenres: (action: React.SetStateAction<number[]>) => {
            const next = typeof action === 'function' ? action(selectedGenres) : action;
            updateParams({ page: 1, genres: next });
        },

        toggleGenre: (genreId: number) => {
            const next =
                selectedGenres.includes(genreId) ?
                    selectedGenres.filter((id) => id !== genreId)
                :   [...selectedGenres, genreId];
            updateParams({ page: 1, genres: next });
        },

        setSelectedProviders: (action: React.SetStateAction<number[]>) => {
            const next = typeof action === 'function' ? action(selectedProviders) : action;
            updateParams({ page: 1, providers: next });
        },

        toggleProvider: (providerId: number) => {
            const next =
                selectedProviders.includes(providerId) ?
                    selectedProviders.filter((id) => id !== providerId)
                :   [...selectedProviders, providerId];
            updateParams({ page: 1, providers: next });
        },

        setSortBy: (sort: string) => updateParams({ page: 1, sort }),
        setFromYear: (year: string) => updateParams({ page: 1, fromYear: year }),
        setToYear: (year: string) => updateParams({ page: 1, toYear: year }),
        setCountry: (countryCode: string) => updateParams({ page: 1, country: countryCode }),

        clearAllFilters: () => {
            updateParams({
                page: 1,
                genres: [],
                providers: [],
                sort: 'popularity.desc',
                fromYear: '',
                toYear: '',
                country: 'ALL',
            });
        },
    };
}
