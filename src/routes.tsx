import { lazy } from 'react';
import Layout from '@/layout';
import AuthLayout from './components/layout/auth-layout';
import NotFound from './not-found';
import AuthPage from './features/auth';
import ProfilePage from './features/profile';
import PersonDetailPage from './features/person';

const Home = lazy(() => import('@/features/home'));
const DetailPage = lazy(() => import('@/features/detail'));
const Search = lazy(() => import('@/features/search'));
const DiscoverPage = lazy(() => import('./features/discover/components/discover-page'));

export const routes = [
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <AuthPage mode='login' /> },
            { path: '/register', element: <AuthPage mode='register' /> },
            { path: '/forgot-password', element: <AuthPage mode='forgot' /> },
            { path: '/reset-password', element: <AuthPage mode='reset' /> },
        ],
    },
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
            { path: '/profile', element: <ProfilePage /> },
            { path: '/person/:id', element: <PersonDetailPage /> },
            { path: '/:type/:id', element: <DetailPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
