"use server";

import { db } from "@/db/drizzle";
import { AuthCredentials } from "../../../types";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "../../../auth";
import { headers } from "next/headers";
import ratelimit from "../rateLimit";
import { redirect } from "next/navigation";

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
) {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "217.218.48.228";
  const { success } = await ratelimit.limit(ip);

  if(!success) return redirect("/too-fast")

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Sign in error");
    return { success: false, error: "password or email is not valid" };
  }
}

export async function signUp(params: AuthCredentials) {
  const { fullName, email, universityCard, universityId, password } =
    params;

  const ip = (await headers()).get("x-forwarded-for") || "217.218.48.228";
  const { success } = await ratelimit.limit(ip);

  if(!success) return redirect("/too-fast")

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashPassword,
      universityCard,
    });

    await signInWithCredentials(params);
    return { success: true };
  } catch (error) {
    console.log(error, "Sign un error");
    return { success: false, error: "Sign up error" };
  }
}
