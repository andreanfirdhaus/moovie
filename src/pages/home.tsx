import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types/tmdb/movie';
import { getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '@/api/movie/route';
import { getMediaType, getBackdropUrl, getMovieTitle, getGenresText } from '@/utils/tmdb-helpers';
import { GetListPayload } from '@/types/tmdb/api-payloads';
import { getPopularSeries, getTopRatedSeries } from '@/api/series/route';
import { getDetail } from '@/api/detail/route';
import { Header } from '@/components/ui/header';
import Card from '@/components/ui/card';
import { Clapperboard } from 'lucide-react';

// swiper package
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Home() {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [upComingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

    const [popularSeries, setPopularSeries] = useState<Movie[]>([]);
    const [topRatedSeries, setTopRatedSeries] = useState<Movie[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [movieType, setMovieType] = useState<'upcoming' | 'toprated' | 'popular'>('upcoming');
    const [seriesType, setSeriesType] = useState<'popular' | 'toprated'>('popular');

    const displayedMovies =
        movieType === 'upcoming' ? upComingMovies
        : movieType === 'toprated' ? topRatedMovies
        : popularMovies;
    const displayedSeries = seriesType === 'popular' ? popularSeries : topRatedSeries;

    const fetchMovieData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const payload: GetListPayload = { region: 'ID' };

            const [trendingData, upComingData, topRatedData, popularData, popularSeries, topRatedSeries] =
                await Promise.all([
                    getTrendingMovies(payload),
                    getUpcomingMovies(payload),
                    getTopRatedMovies(payload),
                    getPopularMovies(payload),

                    getPopularSeries(payload),
                    getTopRatedSeries(payload),
                ]);

            setUpcomingMovies(upComingData.data.results);
            setTopRatedMovies(topRatedData.data.results);
            setPopularMovies(popularData.data.results);

            setPopularSeries(popularSeries.data.results);
            setTopRatedSeries(topRatedSeries.data.results);

            // Fetch details for all trending movies
            const detailsPromises = trendingData.data.results.map((movie) => getDetail(movie.media_type, movie.id, {}));

            const detailsResults = await Promise.all(detailsPromises);

            // Store as array or object. In this case, I store (runtime and genres).
            const moviesWithDetails = trendingData.data.results.map((movie, index) => ({
                ...movie,
                runtime: detailsResults[index].data.runtime,
                genres: detailsResults[index].data.genres,
            }));

            setTrendingMovies(moviesWithDetails);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch movie data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieData();
    }, []);

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>{error}</p>
            </div>
        );
    }

    if (!trendingMovies || !topRatedMovies) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>No detail available</p>
            </div>
        );
    }

    const backdropSwiperParams = {
        effect: 'fade' as const,
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 900,
        allowTouchMove: false,
    };

    const moviesSwiperParams = {
        slidesPerView: 1,
        spaceBetween: 18,
        centeredSlides: false,
        slidesPerGroupSkip: 1,
        grabCursor: true,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 16,
            },
        },
    };

    return (
        <main>
            <section className='h-[456px] md:h-screen'>
                <Swiper {...backdropSwiperParams} modules={[Autoplay, Pagination]} className='h-full w-full'>
                    {trendingMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className='relative h-full w-full'>
                                <img
                                    src={getBackdropUrl(movie)}
                                    alt={`${getMovieTitle(movie)} backdrop`}
                                    draggable='false'
                                    className='h-full w-full object-cover object-top backdrop-mask'
                                />

                                <div className='absolute bottom-6 md:bottom-32 left-0 right-0 px-4 sm:px-8 md:px-16 lg:px-24'>
                                    <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold md:font-bold text-zinc-200 max-w-3xl mb-0.5 sm:mb-2'>
                                        {getMovieTitle(movie)}
                                        {(() => {
                                            const date = movie.first_air_date || movie.release_date;
                                            return date ? ` (${new Date(date).getFullYear()})` : '';
                                        })()}
                                    </h1>

                                    <p className='sm:text-lg font-medium sm:font-semibold text-zinc-400 sm:text-zinc-300 max-w-xs sm:max-w-lg text-pretty mb-6 sm:mb-2'>
                                        {getGenresText(movie.genres || [])}
                                        {movie.runtime &&
                                            ` • ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                                    </p>

                                    <p className='hidden text-base font-medium text-zinc-400 mb-6 line-clamp-2 sm:line-clamp-3 max-w-xl text-pretty'>
                                        {movie.overview}
                                    </p>

                                    <span className='flex gap-2.5'>
                                        <Link
                                            to={`/${getMediaType(movie)}/detail/${movie.id}`}
                                            className='bg-zinc-200 text-zinc-900 px-4 py-2 md:px-5 md:py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors duration-300'>
                                            Details
                                        </Link>
                                        <button
                                            // onClick={() => handleTrailerClick(detail.id, getMediaType(detail))}
                                            className='flex items-center gap-1 bg-[#0957e1] text-zinc-200 px-4 py-2 md:px-5 md:py-3 rounded-full text-sm font-semibold hover:bg-[#062B9A] transition-colors duration-300'>
                                            <Clapperboard size={20} />
                                            Trailer
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Movies Section */}
            <section className='max-w-7xl mx-auto pt-12 pb-8'>
                <Header
                    title='Movies'
                    categories={[
                        { value: 'popular', label: 'Popular' },
                        { value: 'upcoming', label: 'Upcoming' },
                        { value: 'toprated', label: 'Top Rated' },
                    ]}
                    activeType={movieType}
                    onTypeChange={setMovieType}
                />

                <Swiper {...moviesSwiperParams} className='mySwiper px-4 sm:px-6 lg:px-8 py-4' key={movieType}>
                    {displayedMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={`/${getMediaType(movie)}/detail/${movie.id}`}>
                                <Card type={movie} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Series Section */}
            <section className='max-w-7xl mx-auto pt-8 pb-8 sm:pt-12'>
                <Header
                    title='Series'
                    categories={[
                        { value: 'popular', label: 'Popular' },
                        { value: 'toprated', label: 'Top Rated' },
                    ]}
                    activeType={seriesType}
                    onTypeChange={setSeriesType}
                />

                <Swiper {...moviesSwiperParams} className='mySwiper px-4 sm:px-6 lg:px-8 py-4' key={seriesType}>
                    {displayedSeries.map((series) => (
                        <SwiperSlide key={series.id}>
                            <Link to={`/${getMediaType(series)}/detail/${series.id}`}>
                                <Card type={series} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </main>
    );
}
