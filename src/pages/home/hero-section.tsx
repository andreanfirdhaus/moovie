import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBackdropUrl, getMovieTitle, getGenresText, getDetailUrl } from '@/utils/helper/tmdb-helpers';

interface HeroSectionProps {
    movies: any[];
}

export const HeroSection = ({ movies }: HeroSectionProps) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = Math.min(movies.length, 7);

    const backdropSwiperParams = {
        effect: 'fade' as const,
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 900,
        allowTouchMove: false,
    };

    return (
        <section className='relative h-[456px] md:min-h-[680px]'>
            <Swiper
                {...backdropSwiperParams}
                modules={[Autoplay, Pagination]}
                className='h-full w-full'
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
                {movies.slice(0, 7).map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className='relative h-full w-full'>
                            <img
                                src={getBackdropUrl(movie)}
                                alt={`${getMovieTitle(movie)} backdrop`}
                                draggable='false'
                                className='h-full w-full object-cover object-top backdrop-mask'
                            />

                            <div className='absolute bottom-8 md:bottom-20 left-0 right-0 px-4 sm:px-6 lg:px-12 xl:px-24'>
                                <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold md:font-bold text-gray-100 max-w-3xl mb-0.5 sm:mb-2 text-pretty'>
                                    {getMovieTitle(movie)}
                                    {(() => {
                                        const date = movie.first_air_date || movie.release_date;
                                        return date ? ` (${new Date(date).getFullYear()})` : '';
                                    })()}
                                </h1>

                                <p className='sm:text-lg font-medium sm:font-semibold text-gray-400 max-w-xs sm:max-w-lg text-pretty mt-1 sm:mt-2 mb-6 sm:mb-2'>
                                    {getGenresText(movie.genres || [])}
                                    {movie.runtime && ` • ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                                </p>

                                <p className='hidden text-base font-medium text-gray-400 mb-10 line-clamp-2 sm:line-clamp-2 max-w-2xl text-pretty'>
                                    {movie.overview}
                                </p>

                                <Link
                                    to={getDetailUrl(movie)}
                                    // className='text-zinc-200 border border-l px-4 py-2 md:px-5 md:py-3 rounded-full text-sm font-semibold transition-colors duration-300'>
                                    className='bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300'>
                                    More Info
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Left Nav Button */}
            <div className='absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 flex items-center'>
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className='size-8 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/35'
                    aria-label='Previous slide'>
                    <ChevronLeft size={20} />
                </button>
            </div>

            {/* Right Nav Button */}
            <div className='absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 flex items-center'>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className='size-8 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/35'
                    aria-label='Next slide'>
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Slide Indicator Bars — hidden on mobile, centered on sm, right-aligned on md+ */}
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
