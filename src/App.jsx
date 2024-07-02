import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer';
import Navigation from './components/layout/navigation';

function App() {
    return (
        <Fragment>
            <Navigation />
            <Outlet />
            <Footer />
        </Fragment>
    );
}

export default App;
