/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlusIcon, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { favoriteMovies } = useAppContext();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='fixed top-0 left-0 z-50 flex justify-between items-center w-full px-6 md:px-16 lg:px-36 py-5 '>
      <div className='max-md:flex-1'>
        <Link to='/'>
          <img src={assets.logo} alt='Logo' className='w-36 h-auto' />
        </Link>
      </div>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg   flex flex-col md:flex-row max-md:justify-center  items-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full   backdrop-blur  bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden  transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className='md:hidden absolute top-6 right-6 w-6 h-6'
          onClick={() => setIsOpen(!isOpen)}
        ></XIcon>

        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to='/'
        >
          Home
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to='/movies'
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to='/theatres'
        >
          Theatres
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to='/releases'
        >
          Releases
        </Link>
        {favoriteMovies.length > 0 && (
          <Link
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            to='/favorite'
          >
            Favorite
          </Link>
        )}
      </div>

      <div className='flex gap-8 items-center'>
        <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'></SearchIcon>
        {!user ? (
          <button
            className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull  rounded-full transition font-medium  cursor-pointer '
            onClick={openSignIn}
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label='My Booking'
                labelIcon={<TicketPlusIcon width={15} />}
                onClick={() => {
                  navigate("/my-bookings");
                }}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <MenuIcon
        className='md:hidden max-md:ml-4'
        onClick={() => setIsOpen(!isOpen)}
      ></MenuIcon>
    </div>
  );
};

export default Navbar;
