import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar/navbar';

export default function Layout() {
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
