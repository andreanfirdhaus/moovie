import type { StreamingSeason, StreamingEpisode } from '@/types/streaming';

interface SeasonEpisodePanelProps {
    title: string;
    seasons: StreamingSeason[];
    activeSeason: number;
    activeEpisode: StreamingEpisode | null;
    currentSeason: StreamingSeason;
    onSeasonChange: (season: StreamingSeason) => void;
    onEpisodeChange: (episode: StreamingEpisode) => void;
    episodeGridCols?: string;
    titleSize?: string;
}

const activeSeasonClass = 'text-[#0957e1]';
const inactiveSeasonClass = 'text-zinc-400 hover:text-zinc-200';

const activeEpisodeClass = 'bg-zinc-800 text-zinc-200';
const inactiveEpisodeClass = 'bg-[#1e1e1e] text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200';

function getEpisodeClass(isActive: boolean): string {
    return `h-10 flex items-center justify-center rounded-md text-sm font-semibold transition-colors duration-200 ${isActive ? activeEpisodeClass : inactiveEpisodeClass}`;
}

function getSeasonClass(isActive: boolean): string {
    return `font-medium transition-colors duration-200 ${isActive ? activeSeasonClass : inactiveSeasonClass}`;
}

export default function SeasonEpisodePanel({
    title,
    seasons,
    activeSeason,
    activeEpisode,
    currentSeason,
    onSeasonChange,
    onEpisodeChange,
    episodeGridCols = 'grid-cols-4',
    titleSize = 'text-2xl',
}: SeasonEpisodePanelProps) {
    return (
        <div className='overflow-hidden w-full'>
            <h2 className={`${titleSize} font-bold text-zinc-200 mb-2 text-pretty`}>{title}</h2>

            {/* season */}
            <div className='flex gap-4 flex-wrap mb-6'>
                {seasons.map((s) => (
                    <button
                        key={s.season}
                        onClick={() => onSeasonChange(s)}
                        className={getSeasonClass(activeSeason === s.season)}>
                        Season {s.season}
                    </button>
                ))}
            </div>

            {/* episode */}
            <div className={`grid ${episodeGridCols} gap-2 overflow-y-auto max-h-[240px]`}>
                {currentSeason.episodes.map((ep) => {
                    const isActive = activeEpisode?.episode === ep.episode && activeSeason === currentSeason.season;
                    return (
                        <button
                            key={ep.episode}
                            onClick={() => onEpisodeChange(ep)}
                            className={getEpisodeClass(isActive)}>
                            {ep.episode}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
