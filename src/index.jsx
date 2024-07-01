import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import Homepage from './pages/homepage';
import Movies from './pages/movies';
import Series from './pages/series';
import Upcoming from './pages/upcoming';
import Genre from './pages/genre';
import "./styles/index.css";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/movie",
          element: <Movies />,
        },
        {
          path: "/upcoming",
          element: <Upcoming />,
        },
        {
          path: "/series",
          element: <Series />,
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
