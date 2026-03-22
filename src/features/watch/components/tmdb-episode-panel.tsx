import { ChevronDown } from 'lucide-react';
import { TMDB_IMG_300 } from '@/config/images';
import type { Seasons } from '@/types/tmdb/media-detail';
import type { TmdbEpisode } from '@/types/tmdb/media-episode';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';

interface TmdbEpisodePanelProps {
    seasons: Seasons[];
    activeSeason: number;
    activeEpisode: number;
    episodes: TmdbEpisode[];
    isLoadingEpisodes: boolean;
    onSeasonChange: (seasonNumber: number) => void;
    onEpisodeClick: (episodeNumber: number) => void;
}

function SeasonTrigger({ activeSeason, seasons }: { activeSeason: number; seasons: Seasons[] }) {
    const { isOpen } = useDropdown();
    const activeName = seasons.find((s) => s.season_number === activeSeason)?.name ?? `Season ${activeSeason}`;
    return (
        <DropdownTrigger asChild>
            <Button
                variant='ghost'
                rounded='lg'
                className='w-full justify-between px-4 py-2.5 text-sm font-medium text-zinc-100'
                rightIcon={
                    <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                }>
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
}: TmdbEpisodePanelProps) {
    return (
        <div className='w-full space-y-4'>
            <Dropdown className='w-full'>
                <SeasonTrigger activeSeason={activeSeason} seasons={seasons} />
                <DropdownMenu align='left' className='w-full max-h-[420px] overflow-y-auto'>
                    {seasons.map((s) => (
                        <DropdownItem
                            key={s.id}
                            onSelect={() => onSeasonChange(s.season_number)}
                            className={
                                activeSeason === s.season_number ?
                                    'bg-brand/15 text-brand-light hover:bg-brand/20 hover:text-brand-light focus:bg-brand/20 focus:text-brand-light'
                                :   ''
                            }>
                            {s.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {isLoadingEpisodes ?
                <div className='flex items-center justify-center py-8'>
                    <div className='size-6 rounded-full border-2 border-zinc-800 border-t-zinc-300 animate-spin' />
                </div>
            :   <div className='space-y-2 max-h-[420px] overflow-y-auto pr-1'>
                    {episodes.map((ep) => {
                        const isActive = ep.episode_number === activeEpisode;
                        return (
                            <button
                                key={ep.id}
                                onClick={() => onEpisodeClick(ep.episode_number)}
                                className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left 
                                    ${
                                        isActive ?
                                            'bg-brand/15 border-brand/40 text-zinc-100'
                                        :   'bg-surface-2 border-transparent hover:bg-surface-3 hover:border-zinc-700 text-zinc-300'
                                    }`}>
                                <div className='w-24 aspect-video rounded-md overflow-hidden shrink-0 bg-zinc-800'>
                                    {ep.still_path ?
                                        <img
                                            src={TMDB_IMG_300 + ep.still_path}
                                            alt={ep.name}
                                            draggable={false}
                                            className='w-full h-full object-cover'
                                        />
                                    :   <div className='w-full h-full bg-surface-3' />}
                                </div>

                                <div className='flex-1 min-w-0'>
                                    <p className='text-xs text-zinc-400 font-medium mb-0.5'>
                                        Episode {ep.episode_number}
                                    </p>
                                    <p className='text-sm font-semibold truncate'>{ep.name}</p>
                                    {ep.runtime && <p className='text-xs text-zinc-400 mt-0.5'>{ep.runtime}m</p>}
                                </div>
                            </button>
                        );
                    })}
                </div>
            }
        </div>
    );
}
