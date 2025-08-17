/** @format */

import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

// API Controller Function to Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;

    const bookings = await Booking.find({ user })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: {
        code: 200,
        message: "booking get successfully",
        error: false,
      },
      bookings,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API Controller Function to Add Favorite Movie in Clerk User Metadata
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    if (!user.privateMetadata.favorites.includes(movieId)) {
      user.privateMetadata.favorites.push(movieId);
    } else {
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
        (item) => item !== movieId
      );
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata,
    });

    return res.status(200).json({
      status: {
        code: 200,
        message: "Favorite added successfully.",
        error: false,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth().userId);
    const favorites = user.privateMetadata.favorites;

    const movies = await Movie.find({ _id: { $in: favorites } });

    return res.status(200).json({
      status: {
        code: 200,
        message: "booking get successfully",
        error: false,
      },
      movies,
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
