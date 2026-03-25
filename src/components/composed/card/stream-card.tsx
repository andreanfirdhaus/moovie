import Card from '@/components/ui/card';
import type { StreamSearchItem } from '@/types/stream';

interface StreamCardProps {
    item: StreamSearchItem;
}

export function StreamCard({ item }: StreamCardProps) {
    return (
        <Card
            poster={item.poster || undefined}
            title={item.title}
            subtitle={item.year || undefined}
            subtitleAs='time'
        />
    );
}
