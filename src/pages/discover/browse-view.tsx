import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import Card from '@/components/ui/card';
import Loading from '@/components/ui/spinner';
import Pagination from '@/features/controls/pagination';
import GenreFilter from '@/features/controls/genre-filter';
import SortDropdown from '@/features/controls/sort';
import { usePopularMovies, useUpcomingMovies, useTopRatedMovies } from '@/utils/hooks/queries/useMovies';
import { usePopularSeries, useTopRatedSeries } from '@/utils/hooks/queries/useSeries';
import { useMovieGenres, useTVGenres } from '@/utils/hooks/queries/useGenres';
import { getMediaType } from '@/utils/helper/tmdb-helpers';
import EmptyState from './empty-state';

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

    return (
        <main className='min-h-screen pt-20 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-9xl mx-auto lg:mx-5 xl:mx-16'>
                <div className='mb-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4'>
                    <header>
                        <h1 className='text-xl sm:text-2xl font-semibold text-zinc-200'>{displayTitle}</h1>
                    </header>

                    <div className='flex gap-2.5 justify-between sm:justify-normal'>
                        <button className='flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium transition-colors'>
                            <SlidersHorizontal size={16} />
                            <span>Filter</span>
                        </button>
                        <SortDropdown
                            value={sortBy}
                            onChange={setSortBy}
                            mediaType={mediaType === 'movie' ? 'movie' : 'tv'}
                        />
                    </div>
                </div>

                <div className='mb-6 max-w-6xl'>
                    <GenreFilter
                        genres={mediaType === 'movie' ? movieGenres : tvGenres}
                        selectedGenres={selectedGenres}
                        onGenreToggle={(genreId) => {
                            setSelectedGenres((prev) =>
                                prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
                            );
                        }}
                        isLoading={mediaType === 'movie' ? isLoadingMovieGenres : isLoadingTVGenres}
                    />
                </div>

                {isLoadingData ?
                    <Loading />
                : displayData.length > 0 ?
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
                            {displayData.map((item) => (
                                <Link key={item.id} to={`/${getMediaType(item)}/detail/${item.id}`}>
                                    <Card type={item} />
                                </Link>
                            ))}
                        </div>

                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </>
                :   <EmptyState message='Try adjusting your filters or sort options.' />}
            </div>
        </main>
    );
}
