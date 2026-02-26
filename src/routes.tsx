import Layout from '@/layout';
import Home from '@/pages/home/_index';
import Discover from '@/pages/discover/_index';
import DetailPage from '@/pages/detail/_index';
import Streaming from '@/pages/streaming/_index';
import WatchPage from '@/pages/watch/_index';
import NotFound from './not-found';

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/discover',
                element: <Discover />,
            },
            {
                path: '/streaming',
                element: <Streaming />,
            },
            {
                path: '/:type/:id',
                element: <DetailPage />,
            },
            {
                path: '/:type/watch/:id',
                element: <WatchPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];
