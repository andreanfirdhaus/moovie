export const getYear = (movie: any): string => {
    const date = movie.first_air_date || movie.release_date || movie.air_date;
    return date ? new Date(date).getFullYear().toString() : '';
};

export const getUpcomingReleaseDate = (status: string, releaseDate?: string): string => {
    if (!releaseDate || status === 'Released') return '';
    return ` • ${new Date(releaseDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}`;
};
