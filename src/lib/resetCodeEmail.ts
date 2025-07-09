import config from "./config";
import nodemailer from "nodemailer";
import SendResetPasswordEmail from "@/components/SendResetPasswordEmail";
import { render } from "@react-email/render";
import React from "react";

export async function sendEmail(to: string, code: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.env.smtp.user,
      pass: config.env.smtp.pass,
    },
  });

  const emailHTML = await render(
    React.createElement(SendResetPasswordEmail, { code })
  );

  try {
    const info = await transporter.sendMail({
      from: `"University Library" <${config.env.smtp.user}>`,
      to,
      subject: "Verification Code",
      html: emailHTML,
    });
    console.log("Email sent successfully!", info.messageId);
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
}
