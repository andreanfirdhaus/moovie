import type { Media } from '@/types/tmdb/media';
import type { MediaDetail } from '@/types/tmdb/media-detail';
import type { MediaCredits } from '@/types/tmdb/media-credits';
import { TMDB_IMG_300, TMDB_IMG_1280 } from '@/config/images';

type Seasons = {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMediaType = (movie: any): 'tv' | 'movie' => {
    return movie.first_air_date ? 'tv' : 'movie';
};

export const getBackdropUrl = (movie: Media): string | undefined => {
    if (movie?.backdrop_path) {
        return TMDB_IMG_1280 + movie.backdrop_path;
    }
    return undefined;
};

export const getPosterUrl = (movie: Media | MediaDetail | Seasons): string | undefined => {
    const imagePath = movie?.poster_path || (movie as any)?.profile_path;

    if (imagePath) {
        return TMDB_IMG_300 + imagePath;
    }
    return undefined;
};

export const getMediaTitle = (movie: Media | MediaDetail | Seasons): string => {
    return (movie as any).title || (movie as any).name || 'Untitled';
};

export const getCreditsName = (credits: MediaCredits): string => {
    return credits.name || credits.original_name || 'Untitled';
};

export const getRatingPercentage = (voteAverage: number): number => {
    return Math.round(voteAverage * 10);
};

export const getRatingColor = (voteAverage: number): string => {
    const percentage = voteAverage * 10;
    if (percentage >= 70) return 'stroke-green-500';
    if (percentage >= 50) return 'stroke-yellow-500';
    return 'stroke-red-500';
};

export const getGenresText = (genres: { id: number; name: string }[]): string => {
    if (!genres || genres.length === 0) return 'No genres available';
    return genres.map((genre) => genre.name).join(', ');
};

export const getPopularityText = (popularity: number): string => {
    return popularity.toFixed(3);
};
