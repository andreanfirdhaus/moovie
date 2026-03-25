interface EmbedControlsProps {
    activeSeason: number;
    activeEpisode: number;
    onSeasonChange: (s: number) => void;
    onEpisodeChange: (e: number) => void;
}

export default function EmbedControls({
    activeSeason,
    activeEpisode,
    onSeasonChange,
    onEpisodeChange,
}: EmbedControlsProps) {
    return (
        <div className='flex flex-col gap-4 p-5 sm:p-6 bg-surface-2 border border-zinc-800 rounded-xl'>
            <h3 className='text-base sm:text-lg font-semibold text-zinc-100'>Select Episode</h3>

            <div className='flex flex-wrap items-center gap-6'>
                <div className='flex items-center gap-3'>
                    <label className='text-sm text-zinc-400 font-medium w-14'>Season</label>
                    <input
                        type='number'
                        min={1}
                        value={activeSeason}
                        onChange={(e) => onSeasonChange(Math.max(1, Number(e.target.value)))}
                        className='w-20 bg-surface-3 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 text-center focus:outline-none focus:border-brand transition-colors'
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <label className='text-sm text-zinc-400 font-medium w-14'>Episode</label>
                    <input
                        type='number'
                        min={1}
                        value={activeEpisode}
                        onChange={(e) => onEpisodeChange(Math.max(1, Number(e.target.value)))}
                        className='w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 text-center focus:outline-none focus:border-brand transition-colors'
                    />
                </div>
            </div>
        </div>
    );
}
