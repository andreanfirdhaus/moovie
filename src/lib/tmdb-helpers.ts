import type { Movie } from '@/types/tmdb/movie';
import type { MovieDetail } from '@/types/tmdb/movie-detail';
import type { MovieCredits } from '@/types/tmdb/movie-credits';
import { TMDB_IMG_ORIGINAL, FALLBACK_POSTER } from '@/lib/tmdb-image';

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

export const getBackdropUrl = (movie: Movie): string => {
    if (movie?.backdrop_path) {
        return TMDB_IMG_ORIGINAL + movie.backdrop_path;
    }
    return FALLBACK_POSTER;
};

export const getPosterUrl = (movie: Movie | MovieDetail | Seasons): string => {
    const imagePath = movie?.poster_path || (movie as any)?.profile_path;

    if (imagePath) {
        return TMDB_IMG_ORIGINAL + imagePath;
    }
    return FALLBACK_POSTER;
};

export const getMovieTitle = (movie: Movie | MovieDetail | Seasons): string => {
    return (movie as any).title || (movie as any).name || 'Untitled';
};

export const getCreditsName = (credits: MovieCredits): string => {
    return credits.name || credits.original_name || 'Untitled';
};

export const getReleaseYear = (movie: Movie | MovieDetail | Seasons): string => {
    const date = (movie as any).release_date || (movie as any).first_air_date || (movie as any).air_date;
    return date ? new Date(date).getFullYear().toString() : '';
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

const toSlug = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const getDetailUrl = (movie: any): string => {
    const type = getMediaType(movie);
    const id: number = movie.id;
    const slug = toSlug(getMovieTitle(movie));
    return `/${type}/${id}-${slug}`;
};

export const parseDetailId = (idParam: string): string => idParam.split('-')[0];
