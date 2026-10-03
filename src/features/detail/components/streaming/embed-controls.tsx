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
            <h2 className='text-base font-semibold text-foreground'>Episodes</h2>
            <label className='flex items-center gap-2 text-sm text-foreground-muted'>
                Season
                <input
                    type='number'
                    min={1}
                    value={activeSeason}
                    onChange={(event) => onSeasonChange(Math.max(1, Number(event.target.value)))}
                    className='w-16 rounded-lg bg-surface-base border border-border px-2 py-2 text-center text-foreground outline-none focus:border-primary-accent'
                />
            </label>
            <label className='flex items-center gap-2 text-sm text-foreground-muted'>
                Episode
                <input
                    type='number'
                    min={1}
                    value={activeEpisode}
                    onChange={(event) => onEpisodeChange(Math.max(1, Number(event.target.value)))}
                    className='w-16 rounded-lg bg-surface-base border border-border px-2 py-2 text-center text-foreground outline-none focus:border-primary-accent'
                />
            </label>
        </div>
    );
}
