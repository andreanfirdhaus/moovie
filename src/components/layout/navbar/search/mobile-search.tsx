/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchMulti } from '@/services/tmdb/search.service';
import { SearchDropdown } from './search-dropdown';

interface MobileSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300);
        return () => clearTimeout(timer);
    }, [query]);

    // focus input on open
    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 150);
            return () => clearTimeout(timeout);
        } else {
            setQuery('');
            setDebouncedQuery('');
        }
    }, [isOpen]);

    const { data: results = [], isLoading } = useQuery({
        queryKey: ['mobile-navbar-search', debouncedQuery],
        queryFn: async () => {
            if (!debouncedQuery) return [];
            const res = await searchMulti(debouncedQuery, 1);
            return (res.data.results || [])
                .filter(
                    (item: any) =>
                        item.media_type === 'movie' || item.media_type === 'tv' || item.media_type === 'person'
                )
                .slice(0, 8);
        },
        enabled: debouncedQuery.length > 0,
        staleTime: 1000 * 60 * 5,
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <div className='fixed inset-0 z-50 lg:hidden flex flex-col justify-start'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className='fixed inset-0 bg-black/80 backdrop-blur-md'
                    />

                    {/* modal content */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className='relative z-10 w-full px-4 pt-4 pb-6 max-h-[90vh] flex flex-col'>
                        {/* input bar */}
                        <div className='flex items-center gap-2 rounded-2xl border border-white/15 bg-surface-raised p-2 shadow-2xl'>
                            <div className='flex size-10 items-center justify-center text-foreground-secondary'>
                                <Search size={20} />
                            </div>

                            <input
                                ref={inputRef}
                                type='text'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='Search...'
                                className='flex-1 bg-transparent text-base text-foreground placeholder:text-foreground-muted focus:outline-none'
                            />

                            {isLoading && <Loader2 size={18} className='animate-spin text-foreground-muted mr-1' />}

                            {query && !isLoading && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        setQuery('');
                                        inputRef.current?.focus();
                                    }}
                                    className='p-2 text-foreground-muted hover:text-foreground'
                                    aria-label='Clear query'>
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* search results */}
                        {debouncedQuery && (
                            <div className='mt-3 overflow-y-auto rounded-2xl'>
                                <SearchDropdown
                                    results={results}
                                    isLoading={isLoading}
                                    query={debouncedQuery}
                                    onClose={onClose}
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
