import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navigation';

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
