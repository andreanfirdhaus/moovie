import { Movie } from '@/types/tmdb/movie';
import { MovieDetail } from '@/types/tmdb/movie-detail';
import { MovieCredits } from '@/types/tmdb/movie-credits';
import { TMDB_IMG_ORIGINAL, FALLBACK_POSTER } from '@/utils/tmdb-image';

interface Genres {
    id: number;
    name: string;
}

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

export const getMovieTitle = (movie: Movie | MovieDetail): string => {
    return movie.title || movie.name || 'Untitled';
};

export const getCreditsName = (credits: MovieCredits): string => {
    return credits.name || credits.original_name || 'Untitled';
};

export const getReleaseYear = (movie: Movie | MovieDetail): string => {
    const date = movie.release_date || movie.first_air_date || (movie as any).air_date;
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

export const getGenresText = (genres: Genres[]): string => {
    if (!genres || genres.length === 0) return 'No genres available';
    return genres.map((genre) => genre.name).join(', ');
};

export const getPopularityText = (popularity: number): string => {
    return popularity.toFixed(3);
};
