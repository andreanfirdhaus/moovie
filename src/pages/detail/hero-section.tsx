import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Clapperboard } from 'lucide-react';
import { TMDB_IMG_ORIGINAL, TMDB_IMG_300, FALLBACK_POSTER } from '@/utils/helper/tmdb-image';
import { getMovieTitle, getMediaType, getGenresText } from '@/utils/helper/tmdb-helpers';
import RatingCircle from '@/components/ui/rating';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface HeroSectionProps {
    detail: any;
    onTrailerClick: (id: number, type: string) => void;
}

export default function HeroSection({ detail, onTrailerClick }: HeroSectionProps) {
    return (
        <>
            {/* Desktop Layout */}
            <section className='hidden md:block lg:h-[680px]'>
                <div className='relative h-full w-full'>
                    <img
                        src={TMDB_IMG_ORIGINAL + detail.backdrop_path}
                        alt={detail.title || 'Movie backdrop'}
                        draggable='false'
                        className='h-full w-full object-cover object-top backdrop-mask'
                    />

                    <div className='absolute inset-0 bg-black/40' />

                    {/* Movie Info Overlay */}
                    <div className='absolute bottom-16 flex items-center px-6 lg:px-12 xl:px-24 max-w-9xl mx-auto gap-10'>
                        <LazyLoadImage
                            src={detail.poster_path ? TMDB_IMG_300 + detail.poster_path : FALLBACK_POSTER}
                            alt={`${getMovieTitle(detail)} poster`}
                            draggable={false}
                            effect='blur'
                            className='bg-contain bg-center rounded-xl w-full'
                            delayTime={300}
                        />

                        <div className='max-w-4xl'>
                            <h1 className='md:text-3xl lg:text-4xl xl:text-[44px] font-bold text-zinc-100 mb-2 text-balance'>
                                {getMovieTitle(detail)}
                                {(() => {
                                    const date = detail.first_air_date || detail.release_date;
                                    return date ? ` (${new Date(date).getFullYear()})` : '';
                                })()}
                            </h1>

                            {detail.tagline && (
                                <blockquote className='text-lg font-medium italic text-zinc-300 max-w-xl text-pretty'>
                                    &quot;{detail.tagline}&quot;
                                </blockquote>
                            )}

                            <div className='flex items-center gap-2 my-3'>
                                {detail.vote_average > 1 && <RatingCircle rating={detail.vote_average} />}

                                <div className='flex flex-col gap-0.5'>
                                    <span className='font-medium text-base text-white'>
                                        {getGenresText(detail.genres)}
                                    </span>

                                    <span className='text-sm font-medium text-zinc-400'>
                                        {detail.runtime && (
                                            <>
                                                {`${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`}
                                                {detail.status && ` • ${detail.status}`}

                                                {/* Show release date only if status is not "Released" */}
                                                {detail.status !== 'Released' && detail.release_date && (
                                                    <>
                                                        {' '}
                                                        •{' '}
                                                        {new Date(detail.release_date).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </>
                                                )}
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

                            <p className='text-base font-medium text-zinc-300 mb-6 text-balance leading-relaxed whitespace-pre-line'>
                                {detail.overview}
                            </p>

                            <button
                                onClick={() => onTrailerClick(detail.id, getMediaType(detail))}
                                className='flex items-center gap-1.5 bg-[#0957e1] text-zinc-200 px-5 py-3 rounded-full text-sm font-medium hover:bg-[#062B9A] transition-colors duration-300'>
                                <Clapperboard size={20} />
                                Trailer
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Layout */}
            <section className='block md:hidden'>
                <div className='h-96'>
                    <div className='relative h-full w-full'>
                        <img
                            src={TMDB_IMG_ORIGINAL + detail.backdrop_path}
                            alt={detail.title || 'Movie backdrop'}
                            draggable='false'
                            className='h-full w-full object-cover object-top backdrop-mask'
                        />

                        <div className='absolute inset-0 bg-black/15' />

                        <div className='absolute bottom-8 flex items-center mx-auto gap-10 px-4 sm:px-6 lg:px-8'>
                            <LazyLoadImage
                                effect='blur'
                                src={detail.poster_path ? TMDB_IMG_300 + detail.poster_path : FALLBACK_POSTER}
                                alt={`${getMovieTitle(detail)} poster`}
                                className='bg-contain bg-center rounded sm:rounded-xl w-full h-44'
                                delayTime={300}
                            />
                        </div>
                    </div>
                </div>

                <div className='pt-2 px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2 text-balance'>
                        {getMovieTitle(detail)}
                        {(() => {
                            const date = detail.first_air_date || detail.release_date;
                            return date ? ` (${new Date(date).getFullYear()})` : '';
                        })()}
                    </h1>

                    {detail.tagline && (
                        <blockquote className='sm:text-lg font-medium italic text-zinc-300 w-full sm:max-w-xl text-pretty'>
                            &quot;{detail.tagline}&quot;
                        </blockquote>
                    )}

                    <div className='flex items-center gap-2 my-3'>
                        {detail.vote_average > 1 && <RatingCircle rating={detail.vote_average} />}

                        <div className='flex flex-col gap-0.5'>
                            <span className='font-medium text-base text-white max-w-xs'>
                                {getGenresText(detail.genres)}
                            </span>

                            <span className='text-[15px] font-medium text-zinc-500'>
                                {detail.runtime && `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m  •`}
                                {detail.number_of_seasons && `Seasons ${detail.number_of_seasons} •`} {detail.status}
                            </span>
                        </div>
                    </div>

                    <p className='text-base font-medium text-zinc-500 sm:text-zinc-300 mb-6 w-full sm:max-w-2xl sm:text-balance sm:leading-relaxed whitespace-pre-line'>
                        {detail.overview}
                    </p>

                    <button
                        onClick={() => onTrailerClick(detail.id, getMediaType(detail))}
                        className='flex items-center gap-1 bg-[#0957e1] text-zinc-200 px-4 py-2.5 md:px-5 md:py-3 rounded-full text-sm font-semibold hover:bg-[#062B9A] transition-colors duration-300'>
                        <Clapperboard size={20} />
                        Trailer
                    </button>
                </div>
            </section>
        </>
    );
}
