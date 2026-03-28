import Card from '@/components/ui/card';
import type { Media } from '@/types/tmdb/media';
import type { MediaDetail, Seasons } from '@/types/tmdb/media-detail';
import { TMDB_IMG_300 } from '@/config/images';
import { getMediaTitle } from '@/utils/media';
import { getYear } from '@/utils/date';

interface MediaCardProps {
    type: Media | MediaDetail | Seasons;
    titleClassName?: string;
    subtitleClassName?: string;
}

export function MediaCard({ type, titleClassName, subtitleClassName }: MediaCardProps) {
    return (
        <Card
            poster={type.poster_path ? TMDB_IMG_300 + type.poster_path : undefined}
            title={getMediaTitle(type)}
            subtitle={getYear(type) || undefined}
            subtitleAs='time'
            titleClassName={titleClassName}
            subtitleClassName={subtitleClassName}
        />
    );
}
