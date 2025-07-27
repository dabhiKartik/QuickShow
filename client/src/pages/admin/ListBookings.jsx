/** @format */


import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading"
import {BookDateFormate} from '../../lib/DateFormate'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  const getBooking=()=>{
    setBookings(dummyBookingData)
    setLoading(false)
  }

  useEffect(()=>{
getBooking()
  },[])

return !loading ? (
  <>
    <Title text1="List" text2="Bookings" />
    <div className="max-w-4xl mt-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
        <thead>
          <tr className="bg-primary/20 text-left text-white">
            <th className="p-2 font-medium pl-5">User Name</th>
            <th className="p-2 font-medium">Movie Name</th>
            <th className="p-2 font-medium">Show Time</th>
            <th className="p-2 font-medium">Seats</th>
            <th className="p-2 font-medium">Amount</th>
          </tr>
        </thead>

        <tbody className="text-sm font-light">
          {bookings
            .filter((booking) => booking.isPaid === true) // ✅ Filter only paid bookings
            .map((booking, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{booking.user.name}</td>
                <td className="p-2 min-w-45 pl-5">
                  {booking.show.movie.title}
                </td>
                <td className="p-2">
                  {BookDateFormate(booking.show.showDateTime)}
                </td>
                <td className="p-2">
                  {booking.bookedSeats.join(", ")}
                </td>
                <td className="p-2">
                  {currency}
                  {booking.amount}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </>
) : (
  <Loading />
)



}



export default ListBookings;
