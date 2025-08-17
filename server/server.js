/** @format */

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { razorpayWebhook } from "./controllers/razorpayWebhook.js";

const app = express();
const PORT = 3000;

await connectDB();
//middleware

app.use(cors());
app.post(
  "/api/razorpay",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);
app.use(clerkMiddleware());
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.send("server are running"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
