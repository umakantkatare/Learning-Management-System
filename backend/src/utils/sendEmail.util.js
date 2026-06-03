// src/utils/sendEmail.js

import nodemailer from "nodemailer";
import ErrorHandler from "./errorHandler.util.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"LMS Support" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("SMTP ERROR:", error);
    throw new ErrorHandler(error.message || "Email sending failed", 500);
  }
};

export default sendEmail;

