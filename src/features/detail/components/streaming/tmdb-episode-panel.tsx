import { Check, ChevronDown } from 'lucide-react';
import { TMDB_IMG_300 } from '@/config/images';
import type { Seasons } from '@/types/tmdb/media-detail';
import type { TmdbEpisode } from '@/types/tmdb/media-episode';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';

function SeasonTrigger({ activeName }: { activeName: string }) {
    const { isOpen } = useDropdown();
    return (
        <DropdownTrigger asChild>
            <Button
                variant='ghost'
                className='flex py-3 px-3.5 min-w-[140px] items-center justify-between rounded-lg border border-border-subtle bg-surface-raised text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface-hover hover:text-foreground'>
                <span className='tracking-wide'>{activeName}</span>
                <ChevronDown
                    size={13}
                    strokeWidth={2.5}
                    className={cn(
                        'text-foreground-muted transition-transform duration-200',
                        isOpen && 'rotate-180 text-foreground'
                    )}
                />
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
                <h2 className='text-lg font-semibold text-foreground sm:text-xl'>Episodes</h2>

                <Dropdown className='w-fit'>
                    <SeasonTrigger activeName={activeName} />

                    <DropdownMenu align='right' className='w-56 min-w-[200px] max-w-[calc(100vw-2rem)]'>
                        {seasons.map((season) => {
                            const isSelected = season.season_number === activeSeason;

                            return (
                                <DropdownItem
                                    key={season.id}
                                    onSelect={() => onSeasonChange(season.season_number)}
                                    className={cn(
                                        'justify-between',
                                        isSelected && 'bg-surface-hover text-foreground font-semibold'
                                    )}>
                                    <span className='truncate text-sm leading-tight'>{season.name}</span>
                                    {isSelected && <Check size={16} strokeWidth={2} className='flex-shrink-0 ml-2' />}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>

            {isLoadingEpisodes ?
                <div className='flex justify-center py-8'>
                    <div className='size-6 animate-spin rounded-full border-2 border-border-subtle border-t-primary-accent' />
                </div>
            :   <div className='flex flex-wrap gap-x-4 md:gap-x-6 gap-y-8'>
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
                                className={`group min-w-0 shrink-0 text-left basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-3rem)/3)] lg:basis-[calc((100%-6rem)/5)] ${episode.episode_number === activeEpisode ? 'text-foreground' : 'text-foreground-muted'}`}>
                                <div
                                    className={`relative aspect-video overflow-hidden rounded-lg bg-surface-raised transition-all duration-200 ${
                                        episode.episode_number === activeEpisode ?
                                            'border-2 border-primary ring-2 ring-primary/20'
                                        :   'border border-transparent'
                                    }`}>
                                    {episode.still_path ?
                                        <img
                                            src={TMDB_IMG_300 + episode.still_path}
                                            alt={episode.name}
                                            className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                                        />
                                    :   <div className='h-full w-full bg-surface-hover' />}

                                    <div className='absolute inset-x-0 top-0 flex items-center justify-between gap-2 bg-gradient-to-b from-black/80 to-transparent px-2.5 py-2 text-xs font-semibold text-white'>
                                        <span className='rounded bg-black/75 px-1.5 py-1'>
                                            S{episode.season_number} · E{episode.episode_number}
                                        </span>

                                        <span className='hidden sm:block truncate rounded bg-black/75 px-1.5 py-1 text-foreground-secondary'>
                                            {releaseDate}
                                        </span>
                                    </div>

                                    {episode.runtime && (
                                        <span className='hidden sm:block absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white'>
                                            {episode.runtime}m
                                        </span>
                                    )}
                                </div>

                                <p
                                    className={`mt-2 truncate text-sm font-semibold ${
                                        episode.episode_number === activeEpisode ?
                                            'text-primary-accent'
                                        :   'text-foreground'
                                    }`}>
                                    {episode.name}
                                </p>
                                <p className='mt-0.5 line-clamp-2 text-xs leading-5 text-foreground-disabled'>
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
