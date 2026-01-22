import Layout from '@/layout';
import Home from '@/pages/home';
import Discover from '@/pages/discover';
import DetailPage from './pages/[detail]';
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
                path: '/:type/detail/:id',
                element: <DetailPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];
