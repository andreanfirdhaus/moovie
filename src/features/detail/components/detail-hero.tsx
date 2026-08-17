/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Play, Bookmark, Heart, Star } from 'lucide-react';
import { TMDB_IMG_1280, TMDB_IMG_500 } from '@/config/images';
import { getMediaTitle, getMediaType, getGenresText } from '@/utils/media';
import { getYear } from '@/utils/date';
import MediaLogo from '@/components/composed/media-logo';
import { useMediaImages, useMediaCredits } from '../hooks/useDetail.query';
import ProductionCompany from './production-company';

interface DetailHeroProps {
    detail: any;
    onTrailerClick: (id: number, type: string) => void;
    onWatchNow: () => void;
    isLoadingWatch: boolean;
}

export default function DetailHero({ detail, onTrailerClick, onWatchNow, isLoadingWatch }: DetailHeroProps) {
    const mediaType = getMediaType(detail);
    const { data: imagesData } = useMediaImages(mediaType, detail?.id?.toString());
    const logos = imagesData?.logos || [];
    const chosen = logos.find((logo: any) => logo.iso_639_1 === 'en') || logos[0];
    const logoUrl = chosen ? TMDB_IMG_500 + chosen.file_path : null;

    const { data: credits } = useMediaCredits(mediaType, detail?.id?.toString());
    const crew = credits?.crew || [];
    const director = crew.find((person: any) => person.job === 'Director');
    const creator =
        mediaType === 'movie' ? director?.name : detail.created_by?.map((person: any) => person.name).join(', ');

    return (
        <section>
            <figure className='relative h-[380px] w-full md:h-[480px] lg:h-[524px] mb-2'>
                <img
                    src={TMDB_IMG_1280 + detail.backdrop_path}
                    alt={detail.title || 'Movie backdrop'}
                    draggable='false'
                    className='h-full w-full object-cover object-top'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black' />

                {/* Overlay container */}
                <div className='absolute left-0 right-0 bottom-8 z-20 px-4 sm:px-6 lg:px-12 xl:px-24'>
                    <div className='md:max-w-4xl'>
                        {/* Logo */}
                        <div className='mb-4'>
                            <MediaLogo logoUrl={logoUrl} title={getMediaTitle(detail)} />
                        </div>

                        {/* Genres */}
                        <div className='mb-4 flex flex-wrap items-center text-[17px] font-medium text-zinc-300'>
                            {detail.genres?.map((genre, index) => (
                                <span key={genre.id} className='inline-flex items-center'>
                                    {index > 0 && <span className='mx-2 text-zinc-500'>·</span>}
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* Rectangle icon buttons */}
                        <div className='flex items-center gap-3'>
                            <button
                                aria-label='Add to watchlist'
                                className='flex items-center gap-2 px-3 py-2.5 text-zinc-400 rounded-lg bg-surface-2 hover:hover:bg-surface-3 hover:text-zinc-300  transition-colors duration-200'>
                                <Bookmark size={16} />
                                <span className='text-sm font-medium'>Watchlist</span>
                            </button>

                            <button
                                aria-label='Add to favorite'
                                className='flex items-center gap-2 px-3 py-2.5 text-zinc-400 rounded-lg bg-surface-2 hover:hover:bg-surface-3 hover:text-zinc-300  transition-colors duration-200'>
                                <Heart size={16} />
                                <span className='text-sm font-medium'>Favorite</span>
                            </button>

                            <button
                                aria-label='Play trailer'
                                onClick={() => onTrailerClick(detail.id, mediaType)}
                                className='flex items-center gap-2 px-3 py-2.5 text-zinc-400 rounded-lg bg-surface-2 hover:hover:bg-surface-3 hover:text-zinc-300  transition-colors duration-200'>
                                <Play size={16} />
                                <span className='text-sm font-medium'>Trailer</span>
                            </button>
                        </div>
                    </div>
                </div>
            </figure>

            <div className='px-4 sm:px-6 lg:px-12 xl:px-24 md:max-w-5xl'>
                {/* info: rating, runtime, year */}
                <div className='flex items-center gap-2 text-sm text-zinc-300 mb-3'>
                    {typeof detail.vote_average === 'number' && (
                        <div className='inline-flex items-center gap-2 text-yellow-400'>
                            <Star size={16} className='fill-yellow-400' />
                            <span className='font-medium leading-none'>{detail.vote_average.toFixed(1)}</span>
                        </div>
                    )}

                    {mediaType === 'movie' && detail.runtime > 0 && (
                        <div className='flex items-center gap-2'>
                            <span>·</span>
                            <span>
                                {Math.floor(detail.runtime / 60)}h {detail.runtime % 60}m
                            </span>
                        </div>
                    )}

                    {mediaType === 'tv' && detail.number_of_seasons > 0 && (
                        <div className='flex items-center gap-2'>
                            <span>·</span>
                            <span>
                                {detail.number_of_seasons} {detail.number_of_seasons === 1 ? 'Season' : 'Seasons'}
                            </span>
                        </div>
                    )}

                    {mediaType === 'tv' && detail.status && (
                        <div className='flex items-center gap-2'>
                            <span>·</span>
                            <span>{detail.status === 'Returning Series' ? 'Ongoing' : detail.status}</span>
                        </div>
                    )}

                    {getYear(detail) && (
                        <div className='flex items-center gap-3'>
                            <span>·</span>
                            <span>{getYear(detail)}</span>
                        </div>
                    )}
                </div>

                {/* Director (from credits) */}
                {creator && (
                    <div className='text-[15px] text-zinc-300 mb-3 inline-flex items-center gap-2'>
                        <span className='text-zinc-400 font-normal'>
                            {mediaType === 'movie' ? 'Director:' : 'Creator:'}
                        </span>
                        <p className='font-medium text-zinc-400'>{creator}</p>
                    </div>
                )}

                {/* Tagline */}
                {detail.tagline && (
                    <blockquote className='text-[15px] font-medium italic text-zinc-500 max-w-xl text-pretty mb-3'>
                        &quot;{detail.tagline}&quot;
                    </blockquote>
                )}

                {/* Overview */}
                <p className='text-base font-medium text-zinc-400 mb-6 text-pretty leading-7'>{detail.overview}</p>

                {/* Production logos */}
                {detail.production_companies?.length > 0 && (
                    <div className='h-scroll-surface flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-hide py-3'>
                        {detail.production_companies.map((company: any) => (
                            <ProductionCompany key={company.id} company={company} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
