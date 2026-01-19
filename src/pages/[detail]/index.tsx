import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetail, getCredits, getRecommendation, getKeywords } from '@/api/detail/route';
import { Movie } from '@/types/tmdb/movie';
import { MovieDetail } from '@/types/tmdb/movie-detail';
import { MovieCredits } from '@/types/tmdb/movie-credits';
import { TMDB_IMG_ORIGINAL, TMDB_IMG_300, FALLBACK_POSTER } from '@/utils/tmdb-image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
    getMediaType,
    getMovieTitle,
    getCreditsName,
    getReleaseYear,
    getRatingPercentage,
    getRatingColor,
    getGenresText,
    getPopularityText,
} from '@/utils/tmdb-helpers';
import { TrailerModal } from '@/components/ui/modal';

export default function DetailPage() {
    const { type, id } = useParams();
    const [detail, setDetail] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<MovieCredits[]>([]);
    const [allSeasons, setAllSeasons] = useState<MovieDetail[]>([]);
    const [recomendation, setRecomendation] = useState<Movie[]>([]);
    const [keywords, setKeywords] = useState<Array<{ id: number; type: string }>>([]);

    console.log('ini adalah movie keywords', keywords);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<{ id: number; type: string } | null>(null);

    const fetchDetailData = async () => {
        if (!type || !id) {
            setError('Invalid movie/series ID');
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const [detailRes, creditsRes, recRes, keywordsRes] = await Promise.all([
                getDetail(type, id, {}),
                getCredits(type, id, {}),
                getRecommendation(type, id, {}),
                getKeywords(type, id),
            ]);

            setDetail(detailRes.data);
            setCredits(creditsRes.data.cast);
            setAllSeasons(detailRes.data.seasons || null);
            setRecomendation(recRes.data.results);

            const keywordsData = type === 'movie' ? keywordsRes.data.keywords : keywordsRes.data.results;
            setKeywords(keywordsData || []);
        } catch (error) {
            console.error('Error fetching detail page:', error);
            setError('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDetailData();
    }, [type, id]);

    const handleTrailerClick = (movieId: number, mediaType: string) => {
        setSelectedMovie({ id: movieId, type: mediaType });
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
        setTimeout(() => setSelectedMovie(null), 300);
    };

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

    if (!detail) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>No detail available</p>
            </div>
        );
    }

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
                slidesPerView: 6,
            },
        },
    };

    return (
        <main>
            {/* test large device */}
            <section className='hidden sm:block md:h-screen'>
                <div className='relative h-full w-full'>
                    <img
                        src={TMDB_IMG_ORIGINAL + detail.backdrop_path}
                        alt={detail.title || 'Movie backdrop'}
                        draggable='false'
                        className='h-full w-full object-cover object-top'
                        style={{
                            maskImage:
                                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)',
                            WebkitMaskImage:
                                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)',
                        }}
                    />

                    <div className='absolute inset-0 bg-black/70' />

                    {/* Movie Info Overlay */}
                    <div className='absolute inset-0 flex items-center justify-around max-w-[1280px] mx-auto gap-10 px-8 md:px-16 lg:px-24'>
                        <LazyLoadImage
                            effect='blur'
                            src={detail.poster_path ? TMDB_IMG_300 + detail.poster_path : FALLBACK_POSTER}
                            alt={`${getMovieTitle(detail)} poster`}
                            className='bg-contain bg-center rounded-xl w-full'
                            delayTime={300}
                        />

                        <div>
                            <h1 className='text-4xl md:text-5xl font-bold text-white mb-2 text-balance'>
                                {getMovieTitle(detail)}
                                <span className='font-normal text-zinc-400'>
                                    {(() => {
                                        const date = detail.first_air_date || detail.release_date;
                                        return date ? ` (${new Date(date).getFullYear()})` : '';
                                    })()}
                                </span>
                            </h1>

                            {detail.tagline && (
                                <blockquote className='text-lg font-medium italic text-zinc-300 max-w-xl text-pretty'>
                                    &quot;{detail.tagline}&quot;
                                </blockquote>
                            )}

                            <div className='flex items-center gap-2 my-3'>
                                <div className='relative size-14 shrink-0'>
                                    {/* Background circle */}
                                    <svg className='absolute inset-0 -rotate-90' viewBox='0 0 48 48'>
                                        <circle cx='24' cy='24' r='20' stroke='#27272a' strokeWidth='3' fill='none' />
                                    </svg>

                                    {/* Animated progress circle */}
                                    <svg className='absolute inset-0 -rotate-90' viewBox='0 0 48 48'>
                                        <motion.circle
                                            cx='24'
                                            cy='24'
                                            r='20'
                                            className={getRatingColor(detail.vote_average)}
                                            strokeWidth='3'
                                            fill='none'
                                            strokeLinecap='round'
                                            strokeDasharray={2 * Math.PI * 20}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                                            animate={{
                                                strokeDashoffset: 2 * Math.PI * 20 * (1 - detail.vote_average / 10),
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                ease: 'easeOut',
                                                delay: 0.2,
                                            }}
                                        />
                                    </svg>

                                    {/* Rating text */}
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <motion.span
                                            className='text-sm font-bold text-white'
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.8 }}>
                                            {getRatingPercentage(detail.vote_average)}
                                            <sup className='text-[8px]'>%</sup>
                                        </motion.span>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-0.5'>
                                    <span className='font-medium text-[15px] text-white'>
                                        {getGenresText(detail.genres)}
                                    </span>
                                    <span className='text-sm text-zinc-400'>
                                        Popularity {getPopularityText(detail.popularity)}
                                    </span>
                                </div>
                            </div>

                            <p className='text-base font-medium text-zinc-300 mb-6 max-w-2xl text-balance leading-relaxed whitespace-pre-line'>
                                {detail.overview}
                            </p>

                            <span className='flex gap-2.5'>
                                {/* <Link
                                    to={detail.homepage || `#`}
                                    target='_blank'
                                    className='bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors duration-300'>
                                    Website
                                </Link> */}
                                <button
                                    onClick={() => handleTrailerClick(detail.id, getMediaType(detail))}
                                    className='flex items-center gap-1.5 bg-[#0957e1] text-zinc-200 px-5 py-3 rounded-full text-sm font-medium hover:bg-[#062B9A] transition-colors duration-300'>
                                    <Clapperboard size={20} />
                                    Trailer
                                </button>
                            </span>
                            {selectedMovie && (
                                <TrailerModal
                                    isOpen={isTrailerOpen}
                                    onClose={handleCloseTrailer}
                                    movieId={selectedMovie.id}
                                    mediaType={selectedMovie.type}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* test mobile device */}
            <section className='block sm:hidden'>
                <div className='h-96'>
                    <div className='relative h-full w-full'>
                        <img
                            src={TMDB_IMG_ORIGINAL + detail.backdrop_path}
                            alt={detail.title || 'Movie backdrop'}
                            draggable='false'
                            className='h-full w-full object-cover object-top'
                            style={{
                                maskImage:
                                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)',
                                WebkitMaskImage:
                                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)',
                            }}
                        />

                        <div className='absolute inset-0 bg-black/10' />

                        <div className='absolute bottom-8 flex items-center mx-auto gap-10 px-4'>
                            <LazyLoadImage
                                effect='blur'
                                src={detail.poster_path ? TMDB_IMG_300 + detail.poster_path : FALLBACK_POSTER}
                                alt={`${getMovieTitle(detail)} poster`}
                                className='bg-contain bg-center rounded-md sm:rounded-xl w-full h-52'
                                delayTime={300}
                            />
                        </div>
                    </div>
                </div>

                <div className='pt-8 px-4'>
                    <h1 className='text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2 text-balance'>
                        {getMovieTitle(detail)}
                        <span className='font-normal text-zinc-400'>
                            {(() => {
                                const date = detail.first_air_date || detail.release_date;
                                return date ? ` (${new Date(date).getFullYear()})` : '';
                            })()}
                        </span>
                    </h1>

                    {detail.tagline && (
                        <blockquote className='sm:text-lg font-medium italic text-zinc-300 w-full sm:max-w-xl text-pretty'>
                            &quot;{detail.tagline}&quot;
                        </blockquote>
                    )}

                    <div className='flex items-center gap-2 my-3'>
                        <div className='relative size-14 shrink-0'>
                            <svg className='absolute inset-0 -rotate-90' viewBox='0 0 48 48'>
                                <circle cx='24' cy='24' r='20' stroke='#27272a' strokeWidth='3' fill='none' />
                            </svg>

                            <svg className='absolute inset-0 -rotate-90' viewBox='0 0 48 48'>
                                <motion.circle
                                    cx='24'
                                    cy='24'
                                    r='20'
                                    className={getRatingColor(detail.vote_average)}
                                    strokeWidth='3'
                                    fill='none'
                                    strokeLinecap='round'
                                    strokeDasharray={2 * Math.PI * 20}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                                    animate={{
                                        strokeDashoffset: 2 * Math.PI * 20 * (1 - detail.vote_average / 10),
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        ease: 'easeOut',
                                        delay: 0.2,
                                    }}
                                />
                            </svg>

                            <div className='absolute inset-0 flex items-center justify-center'>
                                <motion.span
                                    className='text-sm font-bold text-white'
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}>
                                    {getRatingPercentage(detail.vote_average)}
                                    <sup className='text-[8px]'>%</sup>
                                </motion.span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-0.5'>
                            <span className='font-medium text-[15px] text-white'>{getGenresText(detail.genres)}</span>
                            <span className='text-sm text-zinc-400'>
                                Popularity {getPopularityText(detail.popularity)}
                            </span>
                        </div>
                    </div>

                    <p className='text-base font-medium text-zinc-500 sm:text-zinc-300 mb-6 w-full sm:max-w-2xl sm:text-balance sm:leading-relaxed whitespace-pre-line'>
                        {detail.overview}
                    </p>

                    <span className='flex gap-2.5'>
                        <button
                            onClick={() => handleTrailerClick(detail.id, getMediaType(detail))}
                            className='flex items-center gap-1.5 bg-[#0957e1] text-zinc-200 px-5 py-3 rounded-full text-sm font-medium hover:bg-[#062B9A] transition-colors duration-300'>
                            <Clapperboard size={20} />
                            Trailer
                        </button>
                    </span>

                    {selectedMovie && (
                        <TrailerModal
                            isOpen={isTrailerOpen}
                            onClose={handleCloseTrailer}
                            movieId={selectedMovie.id}
                            mediaType={selectedMovie.type}
                        />
                    )}
                </div>
            </section>

            {credits?.length > 0 && (
                <section className='max-w-7xl mx-auto py-8 sm:py-12 pt-20 sm:pt-0'>
                    <header className='px-4 mb-2 sm:mb-6'>
                        <h1 className='text-left text-2xl font-semibold text-zinc-100'>Series Cast</h1>
                    </header>

                    <Swiper {...moviesSwiperParams} modules={[Autoplay]} className='mySwiper px-4 py-4'>
                        {credits.map((credits) => (
                            <SwiperSlide key={credits.id}>
                                {/* <Link to={`/${getMediaType(credits)}/detail/${credits.id}`}> */}
                                <div className='mx-0.5'>
                                    <LazyLoadImage
                                        effect='blur'
                                        src={
                                            credits.profile_path ? TMDB_IMG_300 + credits.profile_path : FALLBACK_POSTER
                                        }
                                        alt={`${getCreditsName(credits)} poster`}
                                        className='bg-contain bg-center rounded-md sm:rounded-lg w-full'
                                        delayTime={300}
                                    />
                                    <div className='mt-1.5 sm:mt-2'>
                                        <h3 className='text-zinc-200 font-semibold text-sm truncate'>
                                            {getCreditsName(credits)}
                                        </h3>
                                        <p className='text-zinc-400 text-sm font-medium'>{credits.character}</p>
                                        {/* {getReleaseYear(credits) && (
                                                <span className="text-zinc-400 text-sm font-medium">
                                                    {getReleaseYear(credits)}
                                                </span>
                                            )} */}
                                    </div>
                                </div>
                                {/* </Link> */}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            {allSeasons?.length > 0 && (
                <section className='max-w-7xl mx-auto py-8 sm:py-12'>
                    <header className='px-4 mb-2 sm:mb-6'>
                        <h2 className='text-left text-2xl font-semibold text-zinc-100'>All Season</h2>
                    </header>

                    <Swiper {...moviesSwiperParams} modules={[Autoplay]} className='mySwiper px-4 py-4'>
                        {allSeasons.map((seasons) => (
                            <SwiperSlide key={seasons.id}>
                                {/* <Link to={`/${getMediaType(seasons)}/detail/${seasons.id}`}> */}
                                <div className='mx-0.5'>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                                        <LazyLoadImage
                                            effect='blur'
                                            src={
                                                seasons.poster_path ?
                                                    TMDB_IMG_300 + seasons.poster_path
                                                :   FALLBACK_POSTER
                                            }
                                            alt={`${getMovieTitle(seasons)} poster`}
                                            className='bg-contain bg-center rounded-md sm:rounded-lg w-full'
                                            delayTime={300}
                                        />
                                    </motion.div>
                                    <div className='mt-1.5 sm:mt-2'>
                                        <h3 className='text-zinc-200 font-semibold text-sm truncate'>
                                            {getMovieTitle(seasons)}
                                        </h3>
                                        {getReleaseYear(seasons) && (
                                            <span className='text-zinc-400 text-sm font-medium'>
                                                {getReleaseYear(seasons)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* </Link> */}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}

            <section className='max-w-7xl mx-auto py-8 sm:py-12'>
                <header className='px-4 mb-2 sm:mb-6'>
                    <h3 className='text-left text-2xl font-semibold text-zinc-100'>You Might Also Like</h3>
                </header>

                <Swiper {...moviesSwiperParams} modules={[Autoplay]} className='mySwiper px-4 py-4'>
                    {recomendation.map((recomendation) => (
                        <SwiperSlide key={recomendation.id}>
                            <Link to={`/${getMediaType(recomendation)}/detail/${recomendation.id}`}>
                                <div className='mx-0.5'>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                                        <LazyLoadImage
                                            effect='blur'
                                            src={
                                                recomendation.poster_path ?
                                                    TMDB_IMG_300 + recomendation.poster_path
                                                :   FALLBACK_POSTER
                                            }
                                            alt={`${getMovieTitle(recomendation)} poster`}
                                            className='bg-contain bg-center rounded-md sm:rounded-lg w-full'
                                            delayTime={300}
                                        />
                                    </motion.div>
                                    <div className='mt-1.5 sm:mt-2'>
                                        <h3 className='text-zinc-200 font-semibold text-sm truncate'>
                                            {getMovieTitle(recomendation)}
                                        </h3>
                                        {getReleaseYear(recomendation) && (
                                            <span className='text-zinc-400 text-sm font-medium'>
                                                {getReleaseYear(recomendation)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </main>
    );
}
