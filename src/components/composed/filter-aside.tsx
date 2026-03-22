import { X, RotateCcw } from 'lucide-react';
import GenreFilter from '@/components/composed/genre-filter';
import SortDropdown from '@/components/composed/sort';

interface Genre {
    id: number;
    name: string;
}

interface FilterAsideProps {
    mediaType: 'movie' | 'tv';
    genres: Genre[];
    isLoadingGenres: boolean;
    selectedGenres: number[];
    onGenreToggle: (genreId: number) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    onClearFilters: () => void;

    isOpen: boolean;
    onClose: () => void;
}

const DEFAULT_SORT = 'popularity.desc';

export default function FilterAside({
    mediaType,
    genres,
    isLoadingGenres,
    selectedGenres,
    onGenreToggle,
    sortBy,
    onSortChange,
    onClearFilters,
    isOpen,
    onClose,
}: FilterAsideProps) {
    const hasActiveFilters = selectedGenres.length > 0 || sortBy !== DEFAULT_SORT;

    const asideContent = (
        <div className='relative flex flex-col h-full'>
            <div className='absolute top-0 right-0 flex items-center gap-2'>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className='flex items-center gap-1 text-xs text-brand-light hover:text-brand-light/80 transition-colors font-medium'>
                        <RotateCcw size={12} />
                        <span>Clear all</span>
                    </button>
                )}

                {/* only visible on mobile */}
                <button onClick={onClose} className='lg:hidden text-zinc-400 hover:text-zinc-200 transition-colors'>
                    <X size={18} />
                </button>
            </div>

            {/* sort */}
            <section className='mb-6' aria-labelledby='sort-heading'>
                <h2 className='text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3'>Sort by</h2>
                <SortDropdown value={sortBy} onChange={onSortChange} mediaType={mediaType} variant='list' />
            </section>

            {/* divider */}
            <hr className='border-t border-zinc-800 mb-6' />

            {/* genre */}
            <section aria-labelledby='genre-heading'>
                <h2 className='text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3'>Genre</h2>
                <GenreFilter
                    genres={genres}
                    selectedGenres={selectedGenres}
                    onGenreToggle={onGenreToggle}
                    isLoading={isLoadingGenres}
                    variant='vertical'
                />
            </section>
        </div>
    );

    return (
        <>
            {isOpen && <div className='fixed inset-0 bg-black/80 backdrop-blur-md z-30 lg:hidden' onClick={onClose} />}

            {/* desktop */}
            <aside className='hidden lg:block w-56 xl:w-64 flex-shrink-0'>
                <div className='sticky top-28 bg-surface-2 backdrop-blur-sm rounded-xl p-5'>{asideContent}</div>
            </aside>

            {/* mobile*/}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-surface-2 z-40 flex flex-col p-6 transition-transform duration-300 ease-in-out lg:hidden 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {asideContent}
            </aside>
        </>
    );
}
