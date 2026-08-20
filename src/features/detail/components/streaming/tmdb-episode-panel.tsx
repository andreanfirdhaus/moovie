import { ChevronDown } from 'lucide-react';
import { TMDB_IMG_300 } from '@/config/images';
import type { Seasons } from '@/types/tmdb/media-detail';
import type { TmdbEpisode } from '@/types/tmdb/media-episode';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '@/components/ui/dropdown';

function SeasonTrigger({ activeName }: { activeName: string }) {
    const { isOpen } = useDropdown();
    return (
        <DropdownTrigger asChild>
            <Button
                variant='ghost'
                rounded='lg'
                className='min-w-[140px] justify-between px-4 py-2.5 text-sm text-zinc-100'
                rightIcon={<ChevronDown size={14} className={isOpen ? 'rotate-180' : ''} />}>
                {activeName}
            </Button>
        </DropdownTrigger>
    );
}

export default function TmdbEpisodePanel({
    seasons,
    activeSeason,
    activeEpisode,
    episodes,
    isLoadingEpisodes,
    onSeasonChange,
    onEpisodeClick,
}: {
    seasons: Seasons[];
    activeSeason: number;
    activeEpisode: number;
    episodes: TmdbEpisode[];
    isLoadingEpisodes: boolean;
    onSeasonChange: (season: number) => void;
    onEpisodeClick: (episode: number) => void;
}) {
    const activeName =
        seasons.find((season) => season.season_number === activeSeason)?.name ?? `Season ${activeSeason}`;

    return (
        <section className='w-full space-y-4'>
            <div className='flex items-center justify-between gap-4'>
                <h2 className='text-lg font-semibold text-zinc-100 sm:text-xl'>Episodes</h2>

                <Dropdown className='w-fit'>
                    <SeasonTrigger activeName={activeName} />
                    <DropdownMenu
                        align='right'
                        className='w-max min-w-[220px] max-w-[calc(100vw-2rem)] max-h-[420px] overflow-y-auto'>
                        {seasons.map((season) => (
                            <DropdownItem
                                key={season.id}
                                onSelect={() => onSeasonChange(season.season_number)}
                                className='whitespace-nowrap'>
                                {season.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>

            {isLoadingEpisodes ?
                <div className='flex justify-center py-8'>
                    <div className='size-6 animate-spin rounded-full border-2 border-zinc-800 border-t-zinc-300' />
                </div>
            :   <div className='flex flex-wrap gap-x-6 gap-y-8'>
                    {episodes.map((episode) => {
                        const releaseDate =
                            episode.air_date ?
                                new Date(episode.air_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })
                            :   'TBA';

                        return (
                            <button
                                key={episode.id}
                                onClick={() => onEpisodeClick(episode.episode_number)}
                                className={`group min-w-0 shrink-0 basis-full text-left sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(20%-1.2rem)] ${episode.episode_number === activeEpisode ? 'text-zinc-100' : 'text-zinc-400'}`}>
                                <div
                                    className={`relative aspect-video overflow-hidden rounded-lg border-2 bg-zinc-900 ${episode.episode_number === activeEpisode ? 'border-brand' : 'border-transparent group-hover:border-zinc-600'}`}>
                                    {episode.still_path ?
                                        <img
                                            src={TMDB_IMG_300 + episode.still_path}
                                            alt={episode.name}
                                            className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                                        />
                                    :   <div className='h-full w-full bg-surface-3' />}

                                    <div className='absolute inset-x-0 top-0 flex items-center justify-between gap-2 bg-gradient-to-b from-black/80 to-transparent px-2.5 py-2 text-[11px] font-semibold text-white'>
                                        <span className='rounded bg-black/75 px-1.5 py-1'>
                                            S{episode.season_number} · E{episode.episode_number}
                                        </span>
                                        <span className='truncate rounded bg-black/75 px-1.5 py-1 text-zinc-200'>
                                            {releaseDate}
                                        </span>
                                    </div>

                                    {episode.runtime && (
                                        <span className='absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white'>
                                            {episode.runtime}m
                                        </span>
                                    )}
                                </div>

                                <p
                                    className={`mt-2 truncate text-sm font-semibold ${episode.episode_number === activeEpisode ? 'text-brand-light' : 'text-zinc-100'}`}>
                                    {episode.name}
                                </p>
                                <p className='mt-0.5 line-clamp-2 text-[12.5px] leading-5 text-zinc-500'>
                                    {episode.overview || 'No description available.'}
                                </p>
                            </button>
                        );
                    })}
                </div>
            }
        </section>
    );
}
