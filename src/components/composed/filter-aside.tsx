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
    // Mobile drawer
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
        <div className='flex flex-col h-full'>
            {/* header */}
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-sm font-semibold text-gray-100 uppercase tracking-wider'>Filters</h2>
                <div className='flex items-center gap-2'>
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className='flex items-center gap-1 text-xs text-[#4a8aff] hover:text-[#6aa0ff] transition-colors font-medium'>
                            <RotateCcw size={12} />
                            <span>Clear all</span>
                        </button>
                    )}
                    {/* Close button – only visible on mobile */}
                    <button
                        onClick={onClose}
                        className='lg:hidden p-1 text-zinc-400 hover:text-zinc-200 transition-colors'>
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* sort */}
            <div className='mb-6'>
                <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>Sort by</p>
                <SortDropdown value={sortBy} onChange={onSortChange} mediaType={mediaType} variant='list' />
            </div>

            {/* divider */}
            <div className='border-t border-zinc-800 mb-6' />

            {/* genre */}
            <div>
                <p className='text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3'>Genre</p>
                <GenreFilter
                    genres={genres}
                    selectedGenres={selectedGenres}
                    onGenreToggle={onGenreToggle}
                    isLoading={isLoadingGenres}
                    variant='vertical'
                />
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && <div className='fixed inset-0 bg-black/80 backdrop-blur-md z-30 lg:hidden' onClick={onClose} />}

            {/* Desktop aside – always visible */}
            <aside className='hidden lg:block w-56 xl:w-64 flex-shrink-0'>
                <div className='sticky top-28 bg-[#121212] backdrop-blur-sm rounded-xl p-5'>{asideContent}</div>
            </aside>

            {/* Mobile drawer – slides in from left */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-[#121212] z-40 flex flex-col p-6 transition-transform duration-300 ease-in-out lg:hidden 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {asideContent}
            </aside>
        </>
    );
}
