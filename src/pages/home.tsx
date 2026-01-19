import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types/tmdb/movie';
import { getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '@/api/movie/route';
import { getMediaType, getBackdropUrl, getMovieTitle } from '@/utils/tmdb-helpers';
import { GetListPayload } from '@/types/tmdb/api-payloads';
import { getPopularSeries, getTopRatedSeries } from '@/api/series/route';
import Card from '@/components/ui/card';

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

            setTrendingMovies(trendingData.data.results);
            setUpcomingMovies(upComingData.data.results);
            setTopRatedMovies(topRatedData.data.results);
            setPopularMovies(popularData.data.results);

            setPopularSeries(popularSeries.data.results);
            setTopRatedSeries(topRatedSeries.data.results);
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
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1200,
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
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 5,
            },
        },
    };

    return (
        <main>
            <section className='relative h-screen'>
                <Swiper {...backdropSwiperParams} modules={[Autoplay, Pagination]} className='h-full w-full'>
                    {trendingMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className='relative h-full w-full'>
                                <img
                                    src={getBackdropUrl(movie)}
                                    alt={`${getMovieTitle(movie)} backdrop`}
                                    draggable='false'
                                    className='h-full w-full object-cover object-top'
                                    style={{
                                        maskImage:
                                            'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) 28%, rgba(0, 0, 0, 0.5) 72%, rgba(0, 0, 0, 0))',
                                        WebkitMaskImage:
                                            'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0))',
                                    }}
                                />

                                {/* Movie Info Overlay */}
                                <div className='absolute bottom-32 left-0 right-0 px-4 sm:px-8 md:px-16 lg:px-24'>
                                    <h1 className='text-3xl md:text-5xl font-bold text-zinc-200 max-w-2xl mb-2'>
                                        {getMovieTitle(movie)}
                                        <span className='font-normal text-zinc-400'>
                                            {(() => {
                                                const date = movie.first_air_date || movie.release_date;
                                                return date ? ` (${new Date(date).getFullYear()})` : '';
                                            })()}
                                        </span>
                                    </h1>

                                    <p className='text-base font-medium  text-zinc-400 mb-6 line-clamp-3 max-w-xl text-pretty'>
                                        {movie.overview}
                                    </p>

                                    <Link
                                        to={`/${getMediaType(movie)}/detail/${movie.id}`}
                                        className='bg-zinc-100 text-zinc-900 px-5 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors duration-300'>
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Movies Section */}
            <section className='max-w-7xl mx-auto py-8 sm:py-12'>
                <header className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 px-4 mb-2 sm:mb-6'>
                    <h2 className='text-left text-2xl font-semibold text-zinc-100 mb-0 sm:mb-1.5'>Movies</h2>

                    <div className='flex items-center gap-5 sm:gap-6'>
                        <button
                            onClick={() => setMovieType('popular')}
                            className={`text-base font-medium ${movieType === 'popular' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                            Popular
                        </button>
                        <button
                            onClick={() => setMovieType('upcoming')}
                            className={`text-base font-medium ${movieType === 'upcoming' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                            Upcoming
                        </button>
                        <button
                            onClick={() => setMovieType('toprated')}
                            className={`text-base font-medium ${movieType === 'toprated' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                            Top Rated
                        </button>
                    </div>
                </header>

                <Swiper {...moviesSwiperParams} className='mySwiper px-4 py-4' key={movieType}>
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
            <section className='max-w-7xl mx-auto py-8 sm:py-12'>
                <header className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 px-4 mb-2 sm:mb-6'>
                    <h3 className='text-left text-2xl font-semibold text-zinc-100 mb-0 sm:mb-1.5'>Series</h3>

                    <div className='flex items-center gap-5 sm:gap-6'>
                        <button
                            onClick={() => setSeriesType('popular')}
                            className={`text-base font-medium ${seriesType === 'popular' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                            Popular
                        </button>
                        <button
                            onClick={() => setSeriesType('toprated')}
                            className={`text-base font-medium ${seriesType === 'toprated' ? 'text-zinc-200' : 'text-zinc-400'}`}>
                            Top Rated
                        </button>
                    </div>
                </header>

                <Swiper {...moviesSwiperParams} className='mySwiper px-4 py-4' key={seriesType}>
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
