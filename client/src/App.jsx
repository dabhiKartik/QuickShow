/** @format */

import { Route, Routes } from "react-router-dom";

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
import { SignIn } from "@clerk/clerk-react";
import { useAppContext } from "./context/AppContext";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../src/components/Footer";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
const App = () => {
  const { user } = useAppContext();
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
        <Toaster/>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/loading/:nextUrl' element={<Loading />} />
        <Route path='/favorite' element={<Favorite />} />

        <Route
          path='/admin/*'
          element={
            user ? (
              <Layout />
            ) : (
              <div className='min-h-screen flex justify-center items-center'>
                <SignIn fallbackRedirectUrl={"/admin"} />
              </div>
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-shows' element={<ListShows />} />
          <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
