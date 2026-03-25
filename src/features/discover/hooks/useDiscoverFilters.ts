import { useSearchParams } from 'react-router-dom';

interface UseDiscoverFiltersProps {
    mediaType: string;
    category: string;
}

export function useDiscoverFilters({ category: _category }: UseDiscoverFiltersProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryDefaultSort = _category === 'toprated' ? 'vote_average.desc' : 'popularity.desc';

    const currentPage = parseInt(searchParams.get('page') || '1');
    const selectedGenres = searchParams.get('genres') ? searchParams.get('genres')!.split(',').map(Number) : [];
    const sortBy = searchParams.get('sort') || categoryDefaultSort;

    const updateParams = (patch: { page?: number; genres?: number[]; sort?: string }) => {
        const next = new URLSearchParams(searchParams);

        const newPage = patch.page ?? currentPage;
        if (newPage > 1) {
            next.set('page', String(newPage));
        } else {
            next.delete('page');
        }

        const newGenres = patch.genres ?? selectedGenres;
        if (newGenres.length > 0) {
            next.set('genres', newGenres.join(','));
        } else {
            next.delete('genres');
        }

        const newSort = patch.sort ?? sortBy;
        if (newSort !== categoryDefaultSort) {
            next.set('sort', newSort);
        } else {
            next.delete('sort');
        }

        setSearchParams(next, { replace: true });
    };

    return {
        currentPage,
        selectedGenres,
        sortBy,

        setCurrentPage: (page: number) => updateParams({ page }),

        setSelectedGenres: (action: React.SetStateAction<number[]>) => {
            const next = typeof action === 'function' ? action(selectedGenres) : action;
            updateParams({ page: 1, genres: next });
        },

        setSortBy: (sort: string) => updateParams({ page: 1, sort }),
    };
}
