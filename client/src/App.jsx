/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Layout from "./pages/admin/Layout";
import AddShows from "./pages/admin/AddShows";
import ListBookings from "./pages/admin/ListBookings";
import ListShows from "./pages/admin/ListShows";
import Dashboard from "./pages/admin/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/movies", element: <Movies /> },

      { path: "/movies/:id", element: <MovieDetails /> },

      { path: "/movies/:id/:date", element: <SeatLayout /> },

      { path: "/favorite", element: <Favorite /> },

      { path: "/my-bookings", element: <MyBookings /> },
    ],
  },
  {
    path: "/admin/*",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-shows",
        element: <AddShows />,
      },
      {
        path: "list-shows",
        element: <ListShows />,
      },
      {
        path: "list-bookings",
        element: <ListBookings />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
