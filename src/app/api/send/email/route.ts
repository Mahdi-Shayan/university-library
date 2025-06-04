import EmailTemplate from "@/components/emailTemplate/EmailTemplate";
import config from "@/lib/config";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(config.env.resend.apiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, userName, dueDate, borrowDate, email } = body;

    if (!dueDate || !borrowDate || !email || !userName) {
      return NextResponse.json({
        error:
          'No data provided "dueDate, borrowDate, email and userName"',
      });
    }

    const { data, error } = await resend.emails.send({
      from: "university library <onboarding@resend.dev>",
      to: [email],
      subject: "Book Receipt",
      react: EmailTemplate({ type, userName, dueDate, borrowDate }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
