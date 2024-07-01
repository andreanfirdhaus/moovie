import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer';
import Navigation from './components/layout/navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
