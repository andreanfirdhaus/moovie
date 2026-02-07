type MediaFilter = 'all' | 'movie' | 'tv' | 'person';

interface FilterTabsProps {
    filters: Array<{
        value: MediaFilter;
        label: string;
        count: number;
    }>;
    activeFilter: MediaFilter;
    onFilterChange: (filter: MediaFilter) => void;
}

export default function FilterTabs({ filters, activeFilter, onFilterChange }: FilterTabsProps) {
    return (
        <div className='mb-8 flex flex-wrap gap-2 sm:gap-3'>
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    disabled={filter.count === 0}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeFilter === filter.value ? 'bg-[#0957e1] text-zinc-200'
                        : filter.count === 0 ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                        : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                    }`}>
                    {filter.label} {filter.count > 0 && `(${filter.count})`}
                </button>
            ))}
        </div>
    );
}
