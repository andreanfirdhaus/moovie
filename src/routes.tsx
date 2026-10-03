import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AppLayout, AuthLayout } from '@/layout';
import NotFound from './not-found';
import AuthPage from './features/auth';
import ProfilePage from './features/profile';
import PersonDetailPage from './features/person';

const Home = lazy(() => import('@/features/home'));
const MoviesPage = lazy(() => import('@/features/movies'));
const TVSeriesPage = lazy(() => import('@/features/tv'));
const DetailPage = lazy(() => import('@/features/detail'));
const DiscoverPage = lazy(() => import('./features/discover'));

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
        element: <AppLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: '/movies',
                element: <MoviesPage />,
            },
            {
                path: '/movie',
                element: <Navigate to='/movies' replace />,
            },
            {
                path: '/tv',
                element: <TVSeriesPage />,
            },
            {
                path: '/discover',
                element: <DiscoverPage key='discover' />,
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

            {
                path: '/search',
                element: <Navigate to='/discover' replace />,
            },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/profile/settings', element: <Navigate to='/profile?tab=settings' replace /> },
            { path: '/person/:id', element: <PersonDetailPage /> },
            { path: '/:type/:id', element: <DetailPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
