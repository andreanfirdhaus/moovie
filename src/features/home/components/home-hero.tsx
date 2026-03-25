import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBackdropUrl, getMediaTitle, getGenresText } from '@/utils/media';
import { getDetailUrl } from '@/utils/url';
import { Button } from '@/components/ui/button';
import { getYear } from '@/utils/date';

interface HomeHeroProps {
    movies: any[];
}

const SwiperParams = {
    effect: 'fade' as const,
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 900,
    allowTouchMove: false,
};

export const HomeHero = ({ movies }: HomeHeroProps) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = Math.min(movies.length, 7);

    return (
        <section className='relative h-[456px] md:min-h-[680px]'>
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

                            <div className='absolute bottom-20 md:bottom-28 left-0 right-0 px-4 sm:px-6 lg:px-12 xl:px-24'>
                                <Button
                                    as='span'
                                    size='sm'
                                    variant='ghost'
                                    rounded='full'
                                    leftIcon={<TrendingUp size={12} />}
                                    className='mb-2 sm:mb-2.5 pointer-events-none bg-black/40 border-white/20 text-white/80 backdrop-blur-sm text-xs'>
                                    Trending this week
                                </Button>

                                <h1 className='text-2xl md:text-4xl lg:text-[44px] lg:leading-tight font-bold text-zinc-100 max-w-3xl text-balance sm:text-pretty mb-0.1 sm:mb-1.5'>
                                    {getMediaTitle(movie)} {getYear(movie) && ` (${getYear(movie)})`}
                                </h1>

                                <p className='text-[15px] md:text-lg font-medium sm:font-semibold text-zinc-200 max-w-xs sm:max-w-lg text-pretty mb-4 sm:mb-2'>
                                    {getGenresText(movie.genres || [])}
                                </p>

                                <p className='hidden text-base font-medium text-zinc-400 mb-4 md:mb-6 line-clamp-2 sm:line-clamp-2 max-w-xl md:max-w-2xl text-pretty'>
                                    {movie.overview}
                                </p>

                                <Button
                                    as={Link}
                                    to={getDetailUrl(movie)}
                                    variant='ghost'
                                    className='bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white backdrop-blur-sm'>
                                    More Info
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* navigation icon */}
            <div className='absolute bottom-6 right-6 flex gap-2 z-10 md:bottom-auto md:right-0 md:left-0 md:top-1/2 md:-translate-y-1/2 md:px-2 xl:px-8 md:justify-between'>
                <Button
                    size='icon'
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label='Previous slide'
                    className='size-8 p-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm border-none'>
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </Button>

                <Button
                    size='icon'
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label='Next slide'
                    className='size-8 p-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm border-none'>
                    <ChevronRight size={20} strokeWidth={2.5} />
                </Button>
            </div>

            {/* indicator bars */}
            <div className='hidden sm:flex absolute sm:bottom-4 md:bottom-16 z-10 items-center gap-1.5 sm:left-1/2 sm:-translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-12 xl:right-24'>
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
