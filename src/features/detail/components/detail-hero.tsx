import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Play, Popcorn } from 'lucide-react';
import { TMDB_IMG_1280, TMDB_IMG_300 } from '@/config/images';
import { getMediaTitle, getMediaType, getGenresText } from '@/utils/media';
import RatingCircle from '@/components/ui/rating';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Button } from '@/components/ui/button';
import { getUpcomingReleaseDate, getYear } from '@/utils/date';

interface DetailHeroProps {
    detail: any;
    onTrailerClick: (id: number, type: string) => void;
    onWatchNow: () => void;
    isLoadingWatch: boolean;
}

export default function DetailHero({ detail, onTrailerClick, onWatchNow, isLoadingWatch }: DetailHeroProps) {
    return (
        <section>
            <figure className='relative h-[280px] w-full md:h-[480px]'>
                <img
                    src={TMDB_IMG_1280 + detail.backdrop_path}
                    alt={detail.title || 'Movie backdrop'}
                    draggable='false'
                    className='h-full w-full object-cover object-top'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black' />
            </figure>

            <div className='max-w-7xl mx-auto flex items-center md:gap-8 px-4 sm:px-6 py-8'>
                <div className='relative flex-shrink-0 md:w-[22%] after:absolute after:inset-0 after:bg-surface-2/20 after:mix-blend-normal'>
                    {detail.poster_path ?
                        <LazyLoadImage
                            src={TMDB_IMG_300 + detail.poster_path}
                            alt={`${getMediaTitle(detail)} poster`}
                            draggable={false}
                            effect='blur'
                            className='hidden md:block bg-contain bg-center md:rounded-lg lg:rounded-xl w-full lg:aspect-[2/3]'
                            delayTime={300}
                        />
                    :   <div className='w-full h-full lg:aspect-[2/3] md:rounded-lg lg:rounded-xl flex items-center justify-center bg-surface-2'>
                            <Popcorn className='text-zinc-500 size-10' />
                        </div>
                    }
                </div>

                <div className='md:max-w-4xl'>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] xl:leading-[1.2] font-bold text-zinc-100 mb-1 text-balance'>
                        {getMediaTitle(detail)}
                        {getYear(detail) && ` (${getYear(detail)})`}
                    </h1>

                    {detail.tagline && (
                        <blockquote className='md:text-lg font-medium italic text-zinc-500 max-w-xl text-pretty mb-3'>
                            &quot;{detail.tagline}&quot;
                        </blockquote>
                    )}

                    <div className='flex items-center gap-3 my-3'>
                        {detail.vote_average > 1 && <RatingCircle rating={detail.vote_average} />}

                        <div className='flex flex-col gap-1'>
                            <span className='text-[15px] font-medium text-zinc-300 tracking-normal'>
                                {getGenresText(detail.genres)}
                            </span>

                            <span className='text-sm font-medium text-zinc-500'>
                                {detail.runtime && (
                                    <>
                                        {`${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`}
                                        {detail.status && ` • ${detail.status}`}
                                        {getUpcomingReleaseDate(detail.status, detail.release_date)}
                                    </>
                                )}

                                {detail.number_of_seasons && (
                                    <>
                                        {`${detail.number_of_seasons} Season${detail.number_of_seasons > 1 ? 's' : ''}`}
                                        {detail.status && ` • ${detail.status}`}
                                    </>
                                )}
                            </span>
                        </div>
                    </div>

                    <p className='text-[15px] sm:text-base font-medium text-zinc-400 mb-6 text-balance leading-relaxed line-clamp-4 md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-none'>
                        {detail.overview}
                    </p>

                    <div className='flex gap-3'>
                        <Button
                            variant='primary'
                            onClick={onWatchNow}
                            isLoading={isLoadingWatch}
                            leftIcon={<Play size={16} className='fill-white' />}>
                            Watch Now
                        </Button>

                        <Button variant='ghost' onClick={() => onTrailerClick(detail.id, getMediaType(detail))}>
                            Trailer
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
