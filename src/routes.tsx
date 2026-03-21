import { lazy } from 'react';
import Layout from '@/layout';
import NotFound from './not-found';

const Home = lazy(() => import('@/features/home'));
const DetailPage = lazy(() => import('@/features/detail'));
const WatchPage = lazy(() => import('@/features/watch'));
const Search = lazy(() => import('@/features/search'));
const DiscoverPage = lazy(() => import('./features/discover/components/discover-page'));

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: '/movie/popular',
                element: <DiscoverPage key='movie-popular' mediaType='movie' category='popular' />,
            },
            {
                path: '/movie/upcoming',
                element: <DiscoverPage key='movie-upcoming' mediaType='movie' category='upcoming' />,
            },
            {
                path: '/movie/toprated',
                element: <DiscoverPage key='movie-toprated' mediaType='movie' category='toprated' />,
            },
            { path: '/tv/popular', element: <DiscoverPage key='tv-popular' mediaType='tv' category='popular' /> },
            { path: '/tv/toprated', element: <DiscoverPage key='tv-toprated' mediaType='tv' category='toprated' /> },

            { path: '/search', element: <Search /> },
            { path: '/:type/:id', element: <DetailPage /> },
            { path: '/:type/watch/:id', element: <WatchPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
