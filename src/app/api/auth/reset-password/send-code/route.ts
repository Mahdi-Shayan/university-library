import { db } from "@/db/drizzle";
import { passwordResetCodes, users } from "@/db/schema";
import config from "@/lib/config";
import ratelimit from "@/lib/rateLimit";
import { sendEmail } from "@/lib/resetCodeEmail";
import { randomInt } from "crypto";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;
    const { searchParams } = new URL(req.url);
    const resendCode = searchParams.get("resend");

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in with your email address" },
        { status: 404 }
      );
    }

    const ip =
      (await headers()).get("x-forwarded-for") || "217.218.48.228";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.redirect(`${config.env.apiEndpoint}/too-fast`);
    }

    // If the code is being resent, delete the old code then create a new one
    if (resendCode === "true") {
      await db
        .delete(passwordResetCodes)
        .where(eq(passwordResetCodes.userId, user.id));

      const newCode = randomInt(100000, 999999).toString();
      const newExpiresAt = new Date(Date.now() + 80 * 1000);

      await db.insert(passwordResetCodes).values({
        userId: user.id,
        code: newCode,
        expiresAt: newExpiresAt,
      });

      await sendEmail(user.email, newCode);

      return NextResponse.json(
        { success: true, message: "Reset password email sent" },
        { status: 200 }
      );
    }

    // If the code is not being resent, create a new one
    await db
      .delete(passwordResetCodes)
      .where(eq(passwordResetCodes.userId, user.id));

    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await db.insert(passwordResetCodes).values({
      userId: user.id,
      code,
      expiresAt,
    });

    await sendEmail(user.email, code);

    return NextResponse.json(
      { success: true, message: "Reset password email sent" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
