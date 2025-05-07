import ReceiptEmailTemplate from "@/components/admin/ReceiptEmailTemplate";
import config from "@/lib/config";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(config.env.resend.apiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { genre, title, dueDate, author, borrowDate, email } = body;

    if (!genre || !title || !dueDate || !author || !borrowDate || !email) {
      return NextResponse.json({
        error: 'No data provided "genre title dueDate author borrowDate"',
      });
    }

    const { data, error } = await resend.emails.send({
      from: "university library <onboarding@resend.dev>",
      to: [email],
      subject: "Book Receipt",
      react: ReceiptEmailTemplate({ body }),
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
