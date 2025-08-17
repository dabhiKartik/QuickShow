/** @format */

import express from "express";
import {
  updateFavorite,
  getFavorites,
  getUserBookings,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/bookings", getUserBookings);
userRouter.post("/update-favorite", updateFavorite);
userRouter.get("/favorites", getFavorites);

export default userRouter;
