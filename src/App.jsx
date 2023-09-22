import React from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MainMovie from "./pages/MainMovie.jsx";
import Genre from "./pages/Genre";
import TvSeries from "./pages/TvSeries";
import Upcoming from "./pages/Upcoming";

function App() {
    return (
        <>
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/movie" element={<MainMovie />} />
                        <Route path="/tv_series" element={<TvSeries />} />
                        <Route path="/genre" element={<Genre />} />
                        <Route path="/upcoming" element={<Upcoming />} />
                    </Routes>
                </Router>
            </div>
            <Footer />
        </>
    );
}

export default App;
