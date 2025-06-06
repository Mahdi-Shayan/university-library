import { db } from "@/db/drizzle";
import { verificationCode } from "@/db/schema";
import config from "@/lib/config";
import ratelimit from "@/lib/rateLimit";
import { sendEmail } from "@/lib/resetCodeEmail";
import { randomInt } from "crypto";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const ip =
      (await headers()).get("x-forwarded-for") || "217.218.48.228";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.redirect(`${config.env.apiEndpoint}/too-fast`);
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await db
      .delete(verificationCode)
      .where(eq(verificationCode.email, email));

    const newCode = randomInt(100000, 999999).toString();
    const newExpiresAt = new Date(Date.now() + 80 * 1000);

    await db.insert(verificationCode).values({
      email,
      code: newCode,
      expiresAt: newExpiresAt,
    });

    await sendEmail(email, newCode);

    return NextResponse.json(
      { success: true, message: "Verification code sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
