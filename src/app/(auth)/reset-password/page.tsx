"use client";

import ResetPasswordForm from "@/components/ResetPasswordForm";

function ResetPasswordPage() {
  async function handleSubmit(data: unknown, endPoint: string) {
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            result?.error ||
            "Failed to send reset password email try again later",
        };
      }

      return {
        success: true,
        message: "Reset password email sent successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  return (
    <section>
      <ResetPasswordForm onSubmit={handleSubmit} />
    </section>
  );
}
export default ResetPasswordPage;
