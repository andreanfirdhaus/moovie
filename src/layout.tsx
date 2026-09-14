import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '@/components/layout/navbar/navbar';

export function AuthLayout() {
    return (
        <>
            <ScrollRestoration />
            <Outlet />
        </>
    );
}

export function AppLayout() {
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            <Outlet />
        </>
    );
}
