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
        <div className='flex flex-wrap gap-1 rounded-full bg-surface-base border border-border-subtle p-1'>
            {filterOptions.map((item) => (
                <Button
                    key={item.value}
                    onClick={() => onFilterChange(item.value)}
                    disabled={item.count === 0}
                    size='sm'
                    rounded='full'
                    className={
                        activeFilter === item.value ?
                            'bg-surface-elevated hover:bg-surface-elevated text-foreground font-semibold px-4 py-2'
                        :   'bg-transparent text-foreground-muted hover:bg-surface-raised hover:text-foreground px-4 py-2'
                    }>
                    {item.label} {item.count > 0 && `(${item.count})`}
                </Button>
            ))}
        </div>
    );
}
