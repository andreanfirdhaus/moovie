import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { getMediaType, getBackdropUrl, getMovieTitle, getGenresText } from '@/utils/helper/tmdb-helpers';

interface HeroSectionProps {
    movies: any[];
}

export const HeroSection = ({ movies }: HeroSectionProps) => {
    const backdropSwiperParams = {
        effect: 'fade' as const,
        fadeEffect: { crossFade: true },
        autoplay: { delay: 7000, disableOnInteraction: false },
        loop: true,
        speed: 900,
        allowTouchMove: false,
    };

    return (
        <section className='h-[456px] md:min-h-[680px]'>
            <Swiper {...backdropSwiperParams} modules={[Autoplay, Pagination]} className='h-full w-full'>
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
                                <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold md:font-bold text-zinc-100 max-w-3xl mb-0.5 sm:mb-2'>
                                    {getMovieTitle(movie)}
                                    {(() => {
                                        const date = movie.first_air_date || movie.release_date;
                                        return date ? ` (${new Date(date).getFullYear()})` : '';
                                    })()}
                                </h1>

                                <p className='sm:text-lg font-medium sm:font-semibold text-zinc-400 sm:text-zinc-300 max-w-xs sm:max-w-lg text-pretty mt-1 sm:mt-2 mb-6 sm:mb-2'>
                                    {getGenresText(movie.genres || [])}
                                    {movie.runtime && ` • ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                                </p>

                                <p className='hidden text-base font-medium text-zinc-400 mb-10 line-clamp-2 sm:line-clamp-2 max-w-2xl text-pretty'>
                                    {movie.overview}
                                </p>

                                <Link
                                    to={`/${getMediaType(movie)}/detail/${movie.id}`}
                                    className='text-zinc-200 border border-l px-4 py-2 md:px-5 md:py-3 rounded-full text-sm font-semibold transition-colors duration-300'>
                                    More Info
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
