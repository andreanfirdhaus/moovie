import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Funnel } from 'lucide-react';
import Card from '@/components/ui/card';
import Pagination from '@/components/composed/pagination';
import FilterAside from '@/components/composed/filter-aside';
import {
    usePopularMovies,
    useUpcomingMovies,
    useTopRatedMovies,
    usePopularSeries,
    useTopRatedSeries,
} from '@/features/discover/queries/use-discover-queries';
import { useMovieGenres, useTVGenres } from '@/features/discover/queries/use-genre-queries';
import { getDetailUrl } from '@/lib/tmdb-helpers';
import EmptyState from './empty-state';

const DEFAULT_SORT = 'popularity.desc';

interface BrowseViewProps {
    mediaType: string;
    category: string;
    currentPage: number;
    selectedGenres: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
    sortBy: string;
    setSortBy: (sort: string) => void;
    onPageChange: (page: number) => void;
}

export default function BrowseView({
    mediaType,
    category,
    currentPage,
    selectedGenres,
    setSelectedGenres,
    sortBy,
    setSortBy,
    onPageChange,
}: BrowseViewProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // fetch genre
    const { data: movieGenres = [], isLoading: isLoadingMovieGenres } = useMovieGenres();
    const { data: tvGenres = [], isLoading: isLoadingTVGenres } = useTVGenres();

    const { data: popularMoviesData, isLoading: isLoadingPopular } = usePopularMovies(
        currentPage,
        selectedGenres,
        sortBy
    );
    const { data: upcomingMoviesData, isLoading: isLoadingUpcoming } = useUpcomingMovies(
        currentPage,
        selectedGenres,
        sortBy
    );
    const { data: topRatedMoviesData, isLoading: isLoadingTopRated } = useTopRatedMovies(
        currentPage,
        selectedGenres,
        sortBy
    );
    const { data: popularSeriesData, isLoading: isLoadingPopularSeries } = usePopularSeries(
        currentPage,
        selectedGenres,
        sortBy
    );
    const { data: topRatedSeriesData, isLoading: isLoadingTopRatedSeries } = useTopRatedSeries(
        currentPage,
        selectedGenres,
        sortBy
    );

    let displayData: any[] = [];
    let displayTitle = '';
    let totalPages = 0;
    let isLoadingData = false;

    if (mediaType === 'movie') {
        displayTitle = 'Movies';
        if (category === 'upcoming') {
            displayData = upcomingMoviesData?.results || [];
            totalPages = upcomingMoviesData?.total_pages || 0;
            displayTitle = 'Upcoming Movies';
            isLoadingData = isLoadingUpcoming;
        } else if (category === 'toprated') {
            displayData = topRatedMoviesData?.results || [];
            totalPages = topRatedMoviesData?.total_pages || 0;
            displayTitle = 'Top Rated Movies';
            isLoadingData = isLoadingTopRated;
        } else if (category === 'popular') {
            displayData = popularMoviesData?.results || [];
            totalPages = popularMoviesData?.total_pages || 0;
            displayTitle = 'Popular Movies';
            isLoadingData = isLoadingPopular;
        }
    } else if (mediaType === 'tv') {
        displayTitle = 'Series';
        if (category === 'popular') {
            displayData = popularSeriesData?.results || [];
            totalPages = popularSeriesData?.total_pages || 0;
            displayTitle = 'Popular Series';
            isLoadingData = isLoadingPopularSeries;
        } else if (category === 'toprated') {
            displayData = topRatedSeriesData?.results || [];
            totalPages = topRatedSeriesData?.total_pages || 0;
            displayTitle = 'Top Rated Series';
            isLoadingData = isLoadingTopRatedSeries;
        }
    }

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
        <main className='min-h-screen pt-20 md:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-9xl mx-auto lg:mx-5 xl:mx-16'>
                {/* header*/}
                <header className='mb-4 flex items-center justify-between'>
                    <h1 className='text-xl font-semibold text-zinc-100'>{displayTitle}</h1>

                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className='lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-full text-sm font-medium transition-colors'>
                        {selectedGenres.length > 0 || sortBy !== DEFAULT_SORT ?
                            <span className='flex items-center justify-center w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold'>
                                {selectedGenres.length + (sortBy !== DEFAULT_SORT ? 1 : 0)}
                            </span>
                        :   <Funnel size={16} />}
                        <span>Filters</span>
                    </button>
                </header>

                {/* two-column layout */}
                <div className='flex gap-6 xl:gap-8 items-start'>
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

                    {/* Content area */}
                    <section className='flex-1 min-w-0'>
                        {isLoadingData ?
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
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
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
                                    {displayData.map((item) => (
                                        <Link key={item.id} to={getDetailUrl(item)}>
                                            <Card type={item} />
                                        </Link>
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                />
                            </>
                        :   <EmptyState message='Try adjusting your filters or sort options.' />}
                    </section>
                </div>
            </div>
        </main>
    );
}
