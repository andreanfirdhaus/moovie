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
        <div className='mb-8 flex flex-wrap gap-2 sm:gap-3'>
            {filterOptions.map((item) => (
                <Button
                    as={Button}
                    key={item.value}
                    onClick={() => onFilterChange(item.value)}
                    disabled={item.count === 0}
                    variant={activeFilter === item.value ? 'secondary' : 'ghost'}
                    className='px-4 py-2'>
                    {item.label} {item.count > 0 && `• ${item.count}`}
                </Button>
            ))}
        </div>
    );
}
