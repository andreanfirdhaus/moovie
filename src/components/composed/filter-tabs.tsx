import { Button } from '../ui/button';

type MediaType = 'all' | 'movie' | 'tv';

interface MediaFilterOption {
    value: MediaType;
    label: string;
    count: number;
}

interface FilterTabsProps {
    filterOptions: MediaFilterOption[];
    activeFilter: MediaType;
    onFilterChange: (filter: MediaType) => void;
}

export default function FilterTabs({ filterOptions, activeFilter, onFilterChange }: FilterTabsProps) {
    return (
        <div className='flex flex-wrap gap-1 rounded-full bg-surface-raised p-1'>
            {filterOptions.map((item) => (
                <Button
                    key={item.value}
                    onClick={() => onFilterChange(item.value)}
                    disabled={item.count === 0}
                    size='sm'
                    rounded='full'
                    className={
                        activeFilter === item.value ?
                            'bg-[#242424] hover:bg-[#242424] text-white font-semibold px-4 py-2'
                        :   'bg-transparent text-zinc-400 hover:bg-[#242424] hover:text-zinc-200 px-4 py-2'
                    }>
                    {item.label} {item.count > 0 && `(${item.count})`}
                </Button>
            ))}
        </div>
    );
}
