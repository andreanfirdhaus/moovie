import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMulti } from '@/services/tmdb/search.service';

export function useNavSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // handle auto-focus and cleanup on open/close
    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setQuery('');
            setDebouncedQuery('');
        }
    }, [isOpen]);

    // handle click outside and ESC Key
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // live search query TMDB
    const { data: results = [], isLoading } = useQuery({
        queryKey: ['navbar-search', debouncedQuery],
        queryFn: async () => {
            if (!debouncedQuery) return [];
            const res = await searchMulti(debouncedQuery, 1);
            const raw = res.data.results || [];

            return raw.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv').slice(0, 6);
        },
        enabled: debouncedQuery.length > 0,
        staleTime: 1000 * 60 * 5,
    });

    const handleClear = () => {
        setQuery('');
        setDebouncedQuery('');
        inputRef.current?.focus();
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        setIsOpen,
        query,
        setQuery,
        results,
        isLoading,
        containerRef,
        inputRef,
        debouncedQuery,
        handleClear,
        handleClose,
    };
}
