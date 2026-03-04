import Layout from '@/layout';
import Home from '@/pages/home';
import Discover from '@/pages/discover';
import DetailPage from '@/pages/detail';
import Streaming from '@/pages/streaming';
import WatchPage from '@/pages/watch';
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
