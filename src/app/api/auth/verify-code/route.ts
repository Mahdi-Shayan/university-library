import { db } from "@/db/drizzle";
import { verificationCode } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { verificationCode: verification } = body;

    if (!verification) {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    const [code] = await db
      .select()
      .from(verificationCode)
      .where(
        and(
          eq(verificationCode.code, verificationCode),
          gt(verificationCode.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!code) {
      return NextResponse.json(
        { error: "Invalid reset code" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Reset code verified" },
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
