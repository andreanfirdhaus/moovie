import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import MainMovie from './pages/MainMovie';
import TvSeries from './pages/TvSeries';
import Upcoming from './pages/Upcoming';
import Genre from './pages/Genre';
import "./styles/index.css";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/movie",
          element: <MainMovie />,
        },
        {
          path: "/tv-series",
          element: <TvSeries />,
        },
        {
          path: "/upcoming",
          element: <Upcoming />,
        },
        {
          path: "/genre",
          element: <Genre />,
        },
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
