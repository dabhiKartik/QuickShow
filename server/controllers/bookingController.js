/** @format */

import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/show.js";
import Razorpay from "razorpay";

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const ShowData = await Show.findById(showId);

    if (!ShowData) return false;

    const occupiedSeats = ShowData.occupiedSeats;

    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailableSeat = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailableSeat) {
      throw new Error("selected Seats are not available.");
    }

    const ShowData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: ShowData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });
    selectedSeats.map((seat) => {
      ShowData.occupiedSeats[seat] = userId;
    });

    ShowData.markModified("occupiedSeats");

    await ShowData.save();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const option = {
      amount: Math.floor(booking.amount) * 100, // in paise
      currency: "INR",
      description: ShowData.movie.title,
      notes: {
        bookingId: booking._id.toString(),
        movie: ShowData.movie.title,
      },
      callback_url: `${origin}/loading/my-bookings`,
      callback_method: "get",
      expire_by: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min expiry
    };

    const paymentLink = await razorpay.paymentLink.create(option);

    booking.paymentLink = paymentLink.short_url;
    await booking.save();

    await inngest.send({
      name: "aap/checkPayment",
      data: {
        bookingId: booking._id.toString(),
      },
    });

    return res.status(200).json({
      status: {
        code: 200,
        message: "booking successfully",
        error: false,
      },
      url: paymentLink.short_url,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
      error: true,
    });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    return res.status(200).json({
      status: {
        code: 200,
        message: "get seats successfully",
        error: false,
      },
      occupiedSeats,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
