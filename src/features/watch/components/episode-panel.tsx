import { ChevronDown } from 'lucide-react';
import type { StreamSeason, StreamEpisode } from '@/types/stream';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';

interface SeasonEpisodePanelProps {
    title: string;
    seasons: StreamSeason[];
    activeSeason: number;
    activeEpisode: StreamEpisode | null;
    currentSeason: StreamSeason;
    onSeasonChange: (season: StreamSeason) => void;
    onEpisodeChange: (episode: StreamEpisode) => void;
}

function SeasonTrigger({ activeSeason }: { activeSeason: number }) {
    const { isOpen } = useDropdown();
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
                Season {activeSeason}
            </Button>
        </DropdownTrigger>
    );
}

export default function SeasonEpisodePanel({
    // title,
    seasons,
    activeSeason,
    activeEpisode,
    currentSeason,
    onSeasonChange,
    onEpisodeChange,
}: SeasonEpisodePanelProps) {
    return (
        <div className='w-full space-y-4'>
            <Dropdown className='w-full'>
                <SeasonTrigger activeSeason={activeSeason} />
                <DropdownMenu align='left' className='w-full'>
                    {seasons.map((s) => (
                        <DropdownItem
                            key={s.season}
                            onSelect={() => {
                                const selected = seasons.find((x) => x.season === s.season);
                                if (selected) onSeasonChange(selected);
                            }}
                            className={
                                activeSeason === s.season ?
                                    'bg-brand/15 text-brand-light hover:bg-brand/20 hover:text-brand-light'
                                :   ''
                            }>
                            Season {s.season}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            <div className='space-y-2 max-h-[420px] overflow-y-auto pr-1'>
                {currentSeason.episodes.map((ep) => {
                    const isActive = activeEpisode?.episode === ep.episode && activeSeason === currentSeason.season;
                    return (
                        <button
                            key={ep.episode}
                            onClick={() => onEpisodeChange(ep)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left 
                                ${
                                    isActive ?
                                        'bg-brand/15 border-brand/40 text-zinc-100'
                                    :   'bg-surface-2 border-transparent hover:bg-surface-3 hover:border-zinc-700 text-zinc-300'
                                }`}>
                            <div className='w-24 aspect-video rounded-md overflow-hidden shrink-0'>
                                {ep.cover ?
                                    <img
                                        src={ep.cover}
                                        alt={ep.title}
                                        draggable={false}
                                        className='w-full h-full object-cover'
                                    />
                                :   <div className='w-full h-full bg-surface-3' />}
                            </div>

                            <div className='flex-1 min-w-0'>
                                <p className='text-xs text-zinc-400 font-medium mb-0.5'>Episode {ep.episode}</p>
                                <p className='text-sm font-semibold truncate'>{ep.title || `Episode ${ep.episode}`}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
