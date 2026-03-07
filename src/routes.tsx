import Layout from '@/layout';
import Home from '@/pages/home';
import Discover from '@/pages/discover';
import DetailPage from '@/pages/detail';
import Streaming from '@/pages/streaming';
import WatchPage from '@/pages/watch';
import NotFound from './not-found';
import MoviePopular from '@/pages/movie/popular';
import MovieUpcoming from '@/pages/movie/upcoming';
import MovieTopRated from '@/pages/movie/toprated';
import TvPopular from '@/pages/tv/popular';
import TvTopRated from '@/pages/tv/toprated';

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            // browse routes with explicit paths
            { path: '/movie/popular', element: <MoviePopular /> },
            { path: '/movie/upcoming', element: <MovieUpcoming /> },
            { path: '/movie/toprated', element: <MovieTopRated /> },
            { path: '/tv/popular', element: <TvPopular /> },
            { path: '/tv/toprated', element: <TvTopRated /> },

            { path: '/discover', element: <Discover /> }, // search query
            { path: '/streaming', element: <Streaming /> },
            { path: '/:type/:id', element: <DetailPage /> },
            { path: '/:type/watch/:id', element: <WatchPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
