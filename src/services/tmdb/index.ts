export {
    getPopularMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getTrendingAll,
    getNowPlayingMovies,
    getUpcomingMovies,
    getDiscoverMovies,
} from './movie.service';
export { getPopularSeries, getTopRatedSeries, getAiringToday, getOnTheAir, getDiscoverSeries } from './series.service';
export { getDetail, getCredits, getTrailers, getReviews, getRecommendation, getKeywords } from './media.service';
export { searchMulti, searchMovies, searchSeries } from './search.service';
export { getMovieGenres, getTVGenres } from './genre.service';
