/** @format */

import { useEffect, useState } from "react";

import BlurCircle from "../components/BlurCircle";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import { DateFormate } from "../lib/DateFormate";
import { timeFormate } from "../lib/TimeFormate";
import { NavLink } from "react-router-dom";
const MyBookings = () => {
  const { user, getToken, axios, image_url } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBooking] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMyBooking = async () => {
    const { data } = await axios.get("/api/user/bookings", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (data.status.code === 200) {
      setBooking(data.bookings);
      setLoading(false);
    } else {
      toast.error(data.status.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMyBooking();
    }
  }, [user]);
  return isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] '>
      <BlurCircle top='100px' left='100px' />

      <div>
        <BlurCircle bottom='0px' right='100px' />
      </div>
      <h1 className='font-bold text-lg mb-4'>My Bookings</h1>

      {bookings.map((booking, index) => (
        <div
          key={index}
          className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-4xl '
        >
          <div className='flex flex-col md:flex-row'>
            <img
              className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'
              src={image_url + booking.show.movie.poster_path}
              alt=''
            />

            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>
                {booking.show.movie.title}
              </p>
              <p className='text-gray-400 text-sm'>
                {timeFormate(booking.show.movie.runtime)}
              </p>
              <p className='text-gray-400 text-sm mt-auto '>
                {DateFormate(booking.show.showDateTime)}
              </p>
            </div>
          </div>
          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl  font-semibold mb-3'>
                {currency}
                {booking.amount}
              </p>
              {!booking.isPaid && (
                <NavLink
                  to={booking.paymentLink}
                  className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'
                >
                  Pay Now
                </NavLink>
              )}
            </div>
            <div className='text-sm'>
              <p>
                <span className='text-gray-400'>Total Tickets:</span>
                {booking.bookedSeats.length}
              </p>
              <p>
                <span className='text-gray-400'>Seat Number:</span>
                {booking.bookedSeats.map((seat) => seat).join(",")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
