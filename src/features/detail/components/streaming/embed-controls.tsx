interface EmbedControlsProps {
    activeSeason: number;
    activeEpisode: number;
    onSeasonChange: (season: number) => void;
    onEpisodeChange: (episode: number) => void;
}

export default function EmbedControls({
    activeSeason,
    activeEpisode,
    onSeasonChange,
    onEpisodeChange,
}: EmbedControlsProps) {
    return (
        <div className='flex flex-wrap items-center gap-4'>
            <h2 className='text-base font-semibold text-zinc-100'>Episodes</h2>
            <label className='flex items-center gap-2 text-sm text-zinc-400'>
                Season
                <input
                    type='number'
                    min={1}
                    value={activeSeason}
                    onChange={(event) => onSeasonChange(Math.max(1, Number(event.target.value)))}
                    className='w-16 rounded-lg border border-zinc-700 bg-surface-3 px-2 py-2 text-center text-zinc-100 outline-none focus:border-brand'
                />
            </label>
            <label className='flex items-center gap-2 text-sm text-zinc-400'>
                Episode
                <input
                    type='number'
                    min={1}
                    value={activeEpisode}
                    onChange={(event) => onEpisodeChange(Math.max(1, Number(event.target.value)))}
                    className='w-16 rounded-lg border border-zinc-700 bg-surface-3 px-2 py-2 text-center text-zinc-100 outline-none focus:border-brand'
                />
            </label>
        </div>
    );
}
