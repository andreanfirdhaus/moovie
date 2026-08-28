import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
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
                path: '/movies',
                element: <DiscoverPage key='movies' mediaType='movie' category='popular' />,
            },
            {
                path: '/movie',
                element: <Navigate to='/movies' replace />,
            },
            {
                path: '/tv',
                element: <DiscoverPage key='tv' mediaType='tv' category='popular' />,
            },
            {
                path: '/discover',
                element: <DiscoverPage key='discover' mediaType='movie' category='popular' />,
            },

            // Legacy category redirects
            {
                path: '/movie/popular',
                element: <Navigate to='/discover?type=movie&sort=popularity.desc' replace />,
            },
            {
                path: '/movie/upcoming',
                element: <Navigate to='/discover?type=movie&category=upcoming' replace />,
            },
            {
                path: '/movie/toprated',
                element: <Navigate to='/discover?type=movie&sort=vote_average.desc' replace />,
            },
            {
                path: '/tv/popular',
                element: <Navigate to='/discover?type=tv&sort=popularity.desc' replace />,
            },
            {
                path: '/tv/toprated',
                element: <Navigate to='/discover?type=tv&sort=vote_average.desc' replace />,
            },

            { path: '/search', element: <Search /> },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/person/:id', element: <PersonDetailPage /> },
            { path: '/:type/:id', element: <DetailPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
