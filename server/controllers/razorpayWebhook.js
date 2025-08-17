/** @format */

import crypto from "crypto";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

export const razorpayWebhook = async (req, res) => {
  try {
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(req.body);
    const digest = shasum.digest("hex");

    const signature = req.headers["x-razorpay-signature"];

    if (digest !== signature) {
      throw new Error("Invalid signature");
    }

    const { event, payload } = JSON.parse(req.body.toString());

    if (event === "payment.captured") {
      const payment = payload.payment.entity;
      const bookingId = payment.notes.bookingId;

      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        await inngest.send({
          name:"app/show.booked"
          ,data:{bookingId}

        })
      }
    } else {
      throw new Error(`Unhandled event: ${event}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
