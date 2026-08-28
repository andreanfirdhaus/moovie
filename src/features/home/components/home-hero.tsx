/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBackdropUrl, getMediaTitle, getGenresText } from '@/utils/media';
import { getDetailUrl } from '@/utils/url';
import { Button } from '@/components/ui/button';
import useMovieImages from '../hooks/useMovieImages.query';
import { TMDB_IMG_500 } from '@/config/images';
import { getYear } from '@/utils/date';

interface HomeHeroProps {
    movies: any[];
}

interface MovieTitleLogoProps {
    movie: any;
}

const SwiperParams = {
    effect: 'fade' as const,
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 900,
    allowTouchMove: true,
};

export const MovieTitleLogo = ({ movie }: MovieTitleLogoProps) => {
    const { data } = useMovieImages(movie?.id);

    const logos = (data as any)?.logos || [];
    const chosen = logos.find((logo: any) => logo.iso_639_1 === 'en') || logos[0];

    const logoUrl = chosen ? TMDB_IMG_500 + chosen.file_path : undefined;

    const title = getMediaTitle(movie);

    if (!logoUrl) return null;

    return (
        <img
            src={logoUrl}
            alt={title}
            className='h-auto w-auto max-h-16 lg:max-h-20 xl:max-h-28 object-contain'
            loading='lazy'
            draggable={false}
        />
    );
};

export const HomeHero = ({ movies }: HomeHeroProps) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = Math.min(movies.length, 7);

    return (
        <section className='relative h-[85svh] min-h-[600px] max-h-[760px] md:min-h-screen'>
            <Swiper
                key={movies.length}
                {...SwiperParams}
                modules={[Pagination, Navigation]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className='h-full w-full'>
                {movies.slice(0, 7).map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className='relative h-full w-full'>
                            <img
                                src={getBackdropUrl(movie)}
                                alt={`${getMediaTitle(movie)} backdrop`}
                                draggable='false'
                                fetchPriority={movie === 0 ? 'high' : 'low'}
                                loading={movie === 0 ? 'eager' : 'lazy'}
                                decoding={movie === 0 ? 'sync' : 'async'}
                                className='h-full w-full object-cover object-top'
                            />
                            <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black' />

                            <div className='absolute bottom-20 md:bottom-32 left-0 right-0 px-4 sm:px-6 lg:px-12 xl:px-20'>
                                <Button
                                    as='span'
                                    size='sm'
                                    variant='ghost'
                                    rounded='full'
                                    leftIcon={<TrendingUp size={14} />}
                                    className='pointer-events-none bg-warning-surface text-warning-text border border-warning-border text-xs mb-1 font-bold backdrop-blur-sm'>
                                    Trending this week
                                </Button>

                                <div className='my-3 md:my-4'>
                                    <MovieTitleLogo movie={movie} />
                                </div>

                                <div className='mb-2 md:mb-4 flex flex-wrap items-center gap-x-1 md:gap-x-2 gap-y-1 text-sm font-medium text-foreground-muted sm:font-semibold'>
                                    {movie.vote_average > 0 && (
                                        <span className='inline-flex items-center gap-1.5 text-warning-text'>
                                            <Star size={18} className='fill-warning-text' />
                                            {movie.vote_average.toFixed(1)}
                                        </span>
                                    )}

                                    {getYear(movie) && (
                                        <>
                                            {movie.vote_average > 0 && <span>·</span>}
                                            <span>{getYear(movie)}</span>
                                        </>
                                    )}

                                    {movie.genres?.length > 0 && (
                                        <>
                                            {(movie.vote_average > 0 || getYear(movie)) && <span>·</span>}

                                            <span>
                                                {movie.genres.map((genre, index) => (
                                                    <span key={genre.id}>
                                                        {index > 0 && ', '}
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className='text-sm md:text-base font-medium text-foreground-muted mb-4 md:mb-6 line-clamp-2 sm:line-clamp-2 max-w-xl md:max-w-2xl text-pretty'>
                                    {movie.overview}
                                </p>

                                <Button
                                    as={Link}
                                    to={getDetailUrl(movie)}
                                    variant='ghost'
                                    className='bg-white/90 text-black backdrop-blur-sm py-3 sm:py-3.5 hover:bg-white hover:text-black'>
                                    Watch Now
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* navigation icon */}
            <div className='hidden md:flex md:justify-between absolute bottom-6 right-6 gap-2 z-10 md:bottom-auto md:right-0 md:left-0 md:top-1/2 md:-translate-y-1/2 px-4 sm:px-6'>
                <Button
                    size='icon'
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label='Previous slide'
                    className='size-8 p-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm'>
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </Button>

                <Button
                    size='icon'
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label='Next slide'
                    className='size-8 p-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm'>
                    <ChevronRight size={20} strokeWidth={2.5} />
                </Button>
            </div>

            {/* indicator bars */}
            <div className='flex absolute bottom-6 left-6 sm:bottom-4 md:bottom-16 lg:bottom-24 z-10 items-center gap-1.5 sm:left-1/2 sm:-translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-12 xl:right-20'>
                {Array.from({ length: totalSlides }).map((_, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <motion.button
                            key={i}
                            onClick={() => swiperRef.current?.slideToLoop(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            animate={{
                                width: isActive ? 36 : 22,
                                backgroundColor: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                            }}
                            whileHover={{
                                backgroundColor: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                            }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            style={{ height: '4.8px', borderRadius: '9999px' }}
                        />
                    );
                })}
            </div>
        </section>
    );
};
