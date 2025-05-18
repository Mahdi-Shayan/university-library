import { Resend } from "resend";
import config from "./config";
import SendResetPasswordContent from "@/components/SendResetPasswordContent";

const resend = new Resend(config.env.resend.apiKey);

export async function sendEmail(to: string, code: string) {
  await resend.emails.send({
    from: "university library <onboarding@resend.dev>",
    to: [to],
    subject: "Reset password code",
    react: SendResetPasswordContent({ code }),
  });
}
