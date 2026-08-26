import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <>
            <ScrollRestoration />
            <Outlet />
        </>
    );
}
