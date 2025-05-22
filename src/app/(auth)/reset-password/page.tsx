"use client";

import ResetPasswordForm from "@/components/ResetPasswordForm";
import { handleVerificationCode } from "@/lib/handleVerificationCode";

function ResetPasswordPage() {
  return (
    <section>
      <ResetPasswordForm onSubmit={handleVerificationCode} />
    </section>
  );
}
export default ResetPasswordPage;
