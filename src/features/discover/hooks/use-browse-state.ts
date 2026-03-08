import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseBrowseStateOptions {
    mediaType: string;
    category: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useBrowseState({ mediaType: _mediaType, category: _category }: UseBrowseStateOptions) {
    const [searchParams, setSearchParams] = useSearchParams();

    const genresFromUrl = searchParams.get('genres');
    const sortFromUrl = searchParams.get('sort');
    const pageFromUrl = searchParams.get('page');

    const categoryDefaultSort = _category === 'toprated' ? 'vote_average.desc' : 'popularity.desc';

    const [currentPage, setCurrentPage] = useState(pageFromUrl ? parseInt(pageFromUrl) : 1);
    const [selectedGenres, setSelectedGenres] = useState<number[]>(
        genresFromUrl ? genresFromUrl.split(',').map(Number) : []
    );
    const [sortBy, setSortBy] = useState<string>(sortFromUrl || categoryDefaultSort);

    // sync filter state to URL query params (genres, sort, page only — type/category live in the path)
    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedGenres.length > 0) params.set('genres', selectedGenres.join(','));
        if (sortBy !== categoryDefaultSort) params.set('sort', sortBy);
        if (currentPage > 1) params.set('page', currentPage.toString());

        setSearchParams(params, { replace: true });
    }, [selectedGenres, sortBy, currentPage, setSearchParams]);

    // wrap setSelectedGenres to reset page on change
    const handleSetSelectedGenres: React.Dispatch<React.SetStateAction<number[]>> = (action) => {
        setSelectedGenres(action);
        setCurrentPage(1);
    };

    // wrap setSortBy to reset page on change
    const handleSetSortBy = (sort: string) => {
        setSortBy(sort);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (!sortFromUrl) {
            setSortBy(categoryDefaultSort);
        }
    }, [_category]);

    return {
        currentPage,
        selectedGenres,
        sortBy,
        setCurrentPage,
        setSelectedGenres: handleSetSelectedGenres,
        setSortBy: handleSetSortBy,
    };
}
