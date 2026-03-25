import Card from '@/components/ui/card';
import type { MediaCredits } from '@/types/tmdb/media-credits';
import { TMDB_IMG_300 } from '@/config/images';
import { getCreditsName } from '@/utils/media';

interface CastCardProps {
    cast: MediaCredits;
}

export function CastCard({ cast }: CastCardProps) {
    return (
        <Card
            poster={cast.profile_path ? TMDB_IMG_300 + cast.profile_path : undefined}
            title={getCreditsName(cast)}
            subtitle={cast.character || undefined}
            subtitleAs='p' //paragraph
        />
    );
}
