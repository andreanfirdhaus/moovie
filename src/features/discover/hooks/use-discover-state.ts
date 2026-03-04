import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type MediaFilter = 'all' | 'movie' | 'tv';

export function useDiscoverState() {
    const [searchParams, setSearchParams] = useSearchParams();

    // URL Params
    const searchQuery = searchParams.get('q') || '';
    const mediaType = searchParams.get('type') || '';
    const category = searchParams.get('category') || '';
    const genresFromUrl = searchParams.get('genres');
    const sortFromUrl = searchParams.get('sort');
    const pageFromUrl = searchParams.get('page');

    // Local State
    const [activeFilter, setActiveFilter] = useState<MediaFilter>('all');
    const [currentPage, setCurrentPage] = useState(pageFromUrl ? parseInt(pageFromUrl) : 1);
    const [selectedGenres, setSelectedGenres] = useState<number[]>(
        genresFromUrl ? genresFromUrl.split(',').map(Number) : []
    );
    const [sortBy, setSortBy] = useState<string>(sortFromUrl || 'popularity.desc');

    // Previous State Tracking
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
    const [prevMediaType, setPrevMediaType] = useState(mediaType);
    const [prevCategory, setPrevCategory] = useState(category);
    const [prevSelectedGenres, setPrevSelectedGenres] = useState(selectedGenres);
    const [prevSortBy, setPrevSortBy] = useState(sortBy);

    // 1. Update URL when filters change (Browse Mode)
    useEffect(() => {
        if (!searchQuery && (mediaType || category)) {
            const params = new URLSearchParams();
            if (mediaType) params.set('type', mediaType);
            if (category) params.set('category', category);
            if (selectedGenres.length > 0) params.set('genres', selectedGenres.join(','));
            if (sortBy !== 'popularity.desc') params.set('sort', sortBy);
            if (currentPage > 1) params.set('page', currentPage.toString());

            setSearchParams(params, { replace: true });
        }
    }, [selectedGenres, sortBy, currentPage, mediaType, category, searchQuery, setSearchParams]);

    // 2. Update URL when search query changes (Search Mode)
    useEffect(() => {
        if (searchQuery) {
            const params = new URLSearchParams();
            params.set('q', searchQuery);
            if (currentPage > 1) params.set('page', currentPage.toString());

            setSearchParams(params, { replace: true });
        }
    }, [searchQuery, currentPage, setSearchParams]);

    // 3. Reset page to 1 on changes
    useEffect(() => {
        const searchQueryChanged = searchQuery !== prevSearchQuery;
        const mediaTypeChanged = mediaType !== prevMediaType;
        const categoryChanged = category !== prevCategory;
        const genresChanged = JSON.stringify(selectedGenres) !== JSON.stringify(prevSelectedGenres);
        const sortChanged = sortBy !== prevSortBy;

        if (searchQueryChanged || mediaTypeChanged || categoryChanged || genresChanged || sortChanged) {
            setCurrentPage(1);
            setPrevSearchQuery(searchQuery);
            setPrevMediaType(mediaType);
            setPrevCategory(category);
            setPrevSelectedGenres(selectedGenres);
            setPrevSortBy(sortBy);
        }
    }, [
        searchQuery,
        mediaType,
        category,
        selectedGenres,
        sortBy,
        prevSearchQuery,
        prevMediaType,
        prevCategory,
        prevSelectedGenres,
        prevSortBy,
    ]);

    // 4. Reset filters when switching to Search Mode
    useEffect(() => {
        if (searchQuery && searchQuery !== prevSearchQuery) {
            setSelectedGenres([]);
            setSortBy('popularity.desc');
            setActiveFilter('movie');
        }
    }, [searchQuery, prevSearchQuery]);

    // 5. Update sort from URL navigation
    useEffect(() => {
        if (sortFromUrl && !searchQuery) {
            setSortBy(sortFromUrl);
        }
    }, [sortFromUrl, searchQuery]);

    return {
        // Values
        searchQuery,
        mediaType,
        category,
        activeFilter,
        currentPage,
        selectedGenres,
        sortBy,
        // Setters
        setActiveFilter,
        setCurrentPage,
        setSelectedGenres,
        setSortBy,
    };
}
