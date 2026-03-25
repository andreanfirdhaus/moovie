import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Funnel } from 'lucide-react';
import Pagination from '@/components/composed/pagination';
import FilterAside from '@/components/composed/filter-aside';
import {
    usePopularMovies,
    useUpcomingMovies,
    useTopRatedMovies,
    usePopularSeries,
    useTopRatedSeries,
} from '@/features/discover/hooks/useDiscover.query';
import { useMovieGenres, useTVGenres } from '@/features/discover/hooks/useGenre.query';
import { getDetailUrl } from '@/utils/url';
import { MediaCard } from '@/components/composed/card/media-card';
import { SORT_BY } from '@/constants/sort-options';

interface DiscoverViewProps {
    mediaType: string;
    category: string;
    currentPage: number;
    selectedGenres: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
    sortBy: string;
    setSortBy: (sort: string) => void;
    onPageChange: (page: number) => void;
}

const DEFAULT_SORT = SORT_BY.POPULARITY_DESC;

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
    movie: {
        popular: 'Popular Movies',
        upcoming: 'Upcoming Movies',
        toprated: 'Top Rated Movies',
    },
    tv: {
        popular: 'Popular Series',
        toprated: 'Top Rated Series',
    },
};

function useDiscoverData(
    mediaType: string,
    category: string,
    currentPage: number,
    selectedGenres: number[],
    sortBy: string
) {
    const isMovie = mediaType === 'movie';
    const isTv = mediaType === 'tv';

    // only fetch the query that matches the current mediaType and category.
    const popular = usePopularMovies(currentPage, selectedGenres, sortBy, isMovie && category === 'popular');
    const upcoming = useUpcomingMovies(currentPage, selectedGenres, sortBy, isMovie && category === 'upcoming');
    const topRated = useTopRatedMovies(currentPage, selectedGenres, sortBy, isMovie && category === 'toprated');
    const popularTv = usePopularSeries(currentPage, selectedGenres, sortBy, isTv && category === 'popular');
    const topRatedTv = useTopRatedSeries(currentPage, selectedGenres, sortBy, isTv && category === 'toprated');

    if (isMovie && category === 'popular') return popular;
    if (isMovie && category === 'upcoming') return upcoming;
    if (isMovie && category === 'toprated') return topRated;
    if (isTv && category === 'popular') return popularTv;
    if (isTv && category === 'toprated') return topRatedTv;

    return popular;
}

export default function DiscoverView({
    mediaType,
    category,
    currentPage,
    selectedGenres,
    setSelectedGenres,
    sortBy,
    setSortBy,
    onPageChange,
}: DiscoverViewProps) {
    const { data: movieGenres = [], isLoading: isLoadingMovieGenres } = useMovieGenres();
    const { data: tvGenres = [], isLoading: isLoadingTVGenres } = useTVGenres();
    const { data, isLoading } = useDiscoverData(mediaType, category, currentPage, selectedGenres, sortBy);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const displayData = data?.results || [];
    const totalPages = data?.total_pages || 0;
    const displayTitle = CATEGORY_LABELS[mediaType]?.[category] ?? 'Browse';
    const activeFilterCount = selectedGenres.length + (sortBy !== DEFAULT_SORT ? 1 : 0);

    function handleGenreToggle(genreId: number) {
        setSelectedGenres((prev) =>
            prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
        );
    }

    function handleClearFilters() {
        setSelectedGenres([]);
        setSortBy(DEFAULT_SORT);
    }

    return (
        <main className='min-h-screen pt-20 md:pt-28 lg:pt-32 pb-12'>
            <div className='px-4 sm:px-6 lg:px-12 xl:px-24'>
                {/* header*/}
                <header className='mb-4 flex items-center justify-between'>
                    <h1 className='text-xl font-semibold text-zinc-100'>{displayTitle}</h1>

                    {/* mobile filter toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className='lg:hidden flex items-center gap-1.5 px-4 py-2 bg-surface-2 hover:bg-surface-3 text-zinc-300 hover:text-zinc-100 border border-zinc-800 rounded-full text-sm font-medium transition-colors'>
                        {activeFilterCount > 0 ?
                            <span className='flex items-center justify-center w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold'>
                                {activeFilterCount}
                            </span>
                        :   <Funnel size={16} />}
                        <span>Filters</span>
                    </button>
                </header>

                {/* two-column layout */}
                <div className='flex gap-6 items-start'>
                    <FilterAside
                        mediaType={mediaType === 'movie' ? 'movie' : 'tv'}
                        genres={mediaType === 'movie' ? movieGenres : tvGenres}
                        isLoadingGenres={mediaType === 'movie' ? isLoadingMovieGenres : isLoadingTVGenres}
                        selectedGenres={selectedGenres}
                        onGenreToggle={handleGenreToggle}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        onClearFilters={handleClearFilters}
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />

                    {/* content area */}
                    <section className='flex-1 min-w-0'>
                        {isLoading ?
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8'>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className='mx-0.5 animate-pulse'>
                                        <div className='relative w-full aspect-[2/3] overflow-hidden rounded-[4px] sm:rounded-[8px] bg-surface-2' />

                                        <div className='mt-1.5 sm:mt-2.5 space-y-1.5'>
                                            <div className='h-3.5 bg-surface-4 rounded w-4/5' />
                                            <div className='h-3 bg-surface-3 rounded w-1/3' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        : displayData.length > 0 ?
                            <>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8'>
                                    {displayData.map((item) => (
                                        <Link key={item.id} to={getDetailUrl(item)}>
                                            <MediaCard type={item} />
                                        </Link>
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                />
                            </>
                        :   <div className='flex flex-col items-center justify-center py-20'>
                                <div className='text-6xl mb-4 text-zinc-400'>
                                    <Film size={56} />
                                </div>
                                <h2 className='text-xl font-semibold text-zinc-100 mb-2'>No results found</h2>
                                <p className='text-zinc-400 text-center max-w-md'>
                                    Try adjusting your filters or sort options.
                                </p>
                            </div>
                        }
                    </section>
                </div>
            </div>
        </main>
    );
}
