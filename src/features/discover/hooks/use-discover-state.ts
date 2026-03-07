import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type MediaFilter = 'all' | 'movie' | 'tv';

export function useDiscoverState() {
    const [searchParams, setSearchParams] = useSearchParams();

    // URL params (search mode only)
    const searchQuery = searchParams.get('q') || '';
    const pageFromUrl = searchParams.get('page');

    // local state
    const [activeFilter, setActiveFilter] = useState<MediaFilter>('all');
    const [currentPage, setCurrentPage] = useState(pageFromUrl ? parseInt(pageFromUrl) : 1);

    // Sync URL when page changes in search mode
    useEffect(() => {
        if (searchQuery) {
            const params = new URLSearchParams();
            params.set('q', searchQuery);
            if (currentPage > 1) params.set('page', currentPage.toString());
            setSearchParams(params, { replace: true });
        }
    }, [searchQuery, currentPage, setSearchParams]);

    // Reset page when search query changes
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
    useEffect(() => {
        if (searchQuery !== prevSearchQuery) {
            setCurrentPage(1);
            setPrevSearchQuery(searchQuery);
            setActiveFilter('all');
        }
    }, [searchQuery, prevSearchQuery]);

    return {
        searchQuery,
        activeFilter,
        currentPage,
        setActiveFilter,
        setCurrentPage,
    };
}
