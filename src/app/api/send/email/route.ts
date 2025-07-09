import EmailTemplate from "@/components/emailTemplate/EmailTemplate";
import config from "@/lib/config";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import React from "react";
import { render } from "@react-email/render";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, userName, dueDate, borrowDate, email } = body;

    if (!dueDate || !borrowDate || !email || !userName) {
      return NextResponse.json(
        {
          error:
            'No data provided: "dueDate, borrowDate, email, userName"',
        },
        { status: 400 }
      );
    }

    const html = await render(
      React.createElement(EmailTemplate, {
        type,
        userName,
        dueDate,
        borrowDate,
      })
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.env.smtp.user,
        pass: config.env.smtp.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"University Library" <${config.env.smtp.user}>`,
      to: email,
      subject: "Book Receipt",
      html,
    });

    return NextResponse.json(
      { messageId: info.messageId },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
