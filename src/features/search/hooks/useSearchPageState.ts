import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type MediaType = 'all' | 'movie' | 'tv';

export function useSearchPageState() {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get('query') || '';
    const initialPage = parseInt(searchParams.get('page') || '1');

    const [activeFilter, setActiveFilter] = useState<MediaType>('all');
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        setCurrentPage(1);
        setActiveFilter('all');
    }, [searchQuery]);

    useEffect(() => {
        if (!searchQuery) return;

        const params = new URLSearchParams({ query: searchQuery });
        if (currentPage > 1) params.set('page', String(currentPage));
        setSearchParams(params, { replace: true });
    }, [searchQuery, currentPage]);

    return { searchQuery, activeFilter, currentPage, setActiveFilter, setCurrentPage };
}
