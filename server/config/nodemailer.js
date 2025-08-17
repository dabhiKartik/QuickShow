/** @format */

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to, subject, body) => {
  const mailOptions = {
    form: process.env.NODEMAILER_EMAIL,
    to,
    subject,
    html: body,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error for Booking Confirmation Email is ${error.message}`);
  }
};
