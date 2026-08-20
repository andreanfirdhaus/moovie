/* eslint-disable @typescript-eslint/no-explicit-any */
import { Play, Bookmark, Heart, Star } from 'lucide-react';
import { TMDB_IMG_1280, TMDB_IMG_500 } from '@/config/images';
import { getMediaTitle, getMediaType } from '@/utils/media';
import { getYear } from '@/utils/date';
import MediaLogo from '@/components/composed/media-logo';
import { useMediaImages, useMediaCredits } from '../hooks/useDetail.query';
import ProductionCompany from './production-company';
import IFrame from '@/components/ui/iframe';
import { Button } from '@/components/ui/button';
import ServerSelector from './streaming/server-selector';
import EmbedControls from './streaming/embed-controls';
import TmdbEpisodePanel from './streaming/tmdb-episode-panel';
import type { ServerOption } from '../types/streaming';
import type { TmdbEpisode } from '@/types/tmdb/media-episode';

interface DetailHeroProps {
    detail: any;
    onTrailerClick: (id: number, type: string) => void;
    onWatchNow: () => void;
    isPlaying: boolean;
    playerUrl: string | null;
    servers: ServerOption[];
    activeServerId: string;
    onServerChange: (id: string) => void;
    activeSeason: number;
    activeEpisode: number;
    onSeasonChange: (season: number) => void;
    onEpisodeChange: (episode: number) => void;
    episodes: TmdbEpisode[];
    isLoadingEpisodes: boolean;
    hasTmdbSeasons: boolean;
    showEmbedTvControls: boolean;
    seasons: any[];
}

export default function DetailHero({
    detail,
    onTrailerClick,
    onWatchNow,
    isPlaying,
    playerUrl,
    servers,
    activeServerId,
    onServerChange,
    activeSeason,
    activeEpisode,
    onSeasonChange,
    onEpisodeChange,
    episodes,
    isLoadingEpisodes,
    hasTmdbSeasons,
    showEmbedTvControls,
    seasons,
}: DetailHeroProps) {
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
            <figure
                className={`relative w-full ${isPlaying ? 'mb-8 sm:mb-10 px-4 pt-28 sm:px-6 lg:px-12 xl:px-24' : 'mb-2 h-[380px] md:h-[480px] lg:h-[524px]'}`}>
                {isPlaying && playerUrl ?
                    <div>
                        <div className='min-w-0 flex-1'>
                            <IFrame playerUrl={playerUrl} />

                            <div className='mt-4 flex items-center justify-between gap-4'>
                                <h1 className='min-w-0 flex-1 truncate text-base font-semibold leading-tight text-zinc-100 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>
                                    {getMediaTitle(detail)}
                                </h1>
                            </div>

                            <div className='mt-3'>
                                <div className='flex flex-wrap items-center text-[17px] font-medium text-zinc-300'>
                                    {detail.genres?.map((genre, index) => (
                                        <span key={genre.id} className='inline-flex items-center'>
                                            {index > 0 && <span className='mx-2 text-zinc-500'>·</span>}
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                <div className='mt-4 flex flex-wrap items-center gap-3'>
                                    <Button
                                        aria-label='Add to watchlist'
                                        variant='ghost'
                                        rounded='lg'
                                        className='px-3 py-2.5 text-zinc-400'>
                                        <Bookmark size={16} />
                                        <span className='text-sm font-medium'>Watchlist</span>
                                    </Button>

                                    <Button
                                        aria-label='Add to favorite'
                                        variant='ghost'
                                        rounded='lg'
                                        className='px-3 py-2.5 text-zinc-400'>
                                        <Heart size={16} />
                                        <span className='text-sm font-medium'>Favorite</span>
                                    </Button>

                                    <Button
                                        aria-label='Play trailer'
                                        onClick={() => onTrailerClick(detail.id, mediaType)}
                                        variant='ghost'
                                        rounded='lg'
                                        className='px-3 py-2.5 text-zinc-400'>
                                        <Play size={16} />
                                        <span className='text-sm font-medium'>Trailer</span>
                                    </Button>

                                    <ServerSelector
                                        servers={servers}
                                        activeServerId={activeServerId}
                                        onSelect={onServerChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {mediaType === 'tv' && (hasTmdbSeasons || showEmbedTvControls) && (
                            <div className='mt-8'>
                                {hasTmdbSeasons ?
                                    <TmdbEpisodePanel
                                        seasons={seasons}
                                        activeSeason={activeSeason}
                                        activeEpisode={activeEpisode}
                                        episodes={episodes}
                                        isLoadingEpisodes={isLoadingEpisodes}
                                        onSeasonChange={onSeasonChange}
                                        onEpisodeClick={onEpisodeChange}
                                    />
                                :   <EmbedControls
                                        activeSeason={activeSeason}
                                        activeEpisode={activeEpisode}
                                        onSeasonChange={onSeasonChange}
                                        onEpisodeChange={onEpisodeChange}
                                    />
                                }
                            </div>
                        )}
                    </div>
                :   <>
                        <img
                            src={TMDB_IMG_1280 + detail.backdrop_path}
                            alt={detail.title || 'Movie backdrop'}
                            draggable='false'
                            className='h-full w-full object-cover object-top'
                        />
                        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black' />

                        <Button
                            aria-label='Play now'
                            onClick={onWatchNow}
                            variant='ghost'
                            size='icon'
                            rounded='full'
                            className='absolute left-1/2 top-1/2 z-20 size-16 -translate-x-1/2 -translate-y-1/2 border-white/80 bg-white/15 text-white shadow-lg transition-transform hover:scale-105 hover:bg-white/25 hover:text-white'>
                            <Play size={28} fill='currentColor' />
                        </Button>

                        {/* Overlay container */}
                        <div className='absolute bottom-8 left-0 right-0 z-20 px-4 sm:px-6 lg:px-12 xl:px-24'>
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
                                <div className='flex flex-wrap items-center gap-3'>
                                    <Button
                                        aria-label='Add to watchlist'
                                        variant='ghost'
                                        rounded='lg'
                                        className='px-3 py-2.5 text-zinc-400'>
                                        <Bookmark size={16} />
                                        <span className='text-sm font-medium'>Watchlist</span>
                                    </Button>

                                    <Button
                                        aria-label='Add to favorite'
                                        variant='ghost'
                                        rounded='lg'
                                        className='px-3 py-2.5 text-zinc-400'>
                                        <Heart size={16} />
                                        <span className='text-sm font-medium'>Favorite</span>
                                    </Button>

                                    <Button
                                        aria-label='Play trailer'
                                        onClick={() => onTrailerClick(detail.id, mediaType)}
                                        variant='ghost'
                                        rounded='lg'
                                        className='px-3 py-2.5 text-zinc-400'>
                                        <Play size={16} />
                                        <span className='text-sm font-medium'>Trailer</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
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
