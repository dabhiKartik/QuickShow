/** @format */
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Outlet />
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default AppLayout;
