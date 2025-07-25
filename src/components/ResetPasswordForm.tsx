"use client";

import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetValidationCode, ResetPassword } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OtpForm from "./OtpForm";
import { useEmailContext } from "@/lib/contexts/emailContext";

interface ResetPasswordType {
  newPassword: string;
  confirmPassword: string;
}

interface OtpType {
  verificationCode: string;
}

interface GetCodeType {
  email: string;
}

interface Props {
  onSubmit: (
    data: unknown,
    endPoint: string
  ) => Promise<{ success: boolean; error?: string }>;
}

function ResetPasswordForm({ onSubmit }: Props) {
  const { setEmail } = useEmailContext();

  const emailForm = useForm<{
    email: string;
  }>({
    resolver: zodResolver(GetValidationCode),
    defaultValues: {
      email: "",
    },
  });
  const ResetPasswordForm = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"CONFIRM_CODE" | "UPDATE_PASSWORD">(
    "CONFIRM_CODE"
  );
  const [isCodeValid, setIsCodeValid] = useState(false);
  const router = useRouter();

  // Sending code to user's email
  async function getCode(data: GetCodeType) {
    try {
      setIsLoading(true);
      const res = await onSubmit(
        data,
        "/api/auth/reset-password/send-code"
      );

      if (res.success) {
        toast.success("Password reset code sent", {
          description: "Please check your email for the code.",
        });
        setEmail(data.email);
        localStorage.setItem("email", JSON.stringify(data.email));
        setType("UPDATE_PASSWORD");
      } else {
        toast.error(res.error ?? "An error occurred.");
      }
    } catch (error) {
      toast.error("Server Error", { description: "Try again later." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Verifying the code
  async function verifyCode(data: OtpType) {
    try {
      setIsLoading(true);
      const res = await onSubmit(data, "/api/auth/verify-code");

      if (res.success) {
        setIsCodeValid(true);
      } else {
        toast.error(res.error ?? "An error occurred.");
        setIsCodeValid(false);
        return;
      }
    } catch (error) {
      toast.error("Server Error", { description: "Try again later." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Resetting the password
  async function resetPassword(data: ResetPasswordType) {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/reset-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailForm.getValues().email,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Password reset successfully");
        emailForm.reset();
        ResetPasswordForm.reset();
        router.push("/sign-in");
      } else {
        toast.error(result.error ?? "An error occurred.");
      }
    } catch (error) {
      toast.error("Server Error", { description: "Try again later." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Reset Your Password</h1>
      <p className="font-light text-light-500">
        Please enter your email address to receive a password reset code.
      </p>

      {type === "CONFIRM_CODE" && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(getCode)}
            className="space-y-8"
          >
            {/* Email input */}
            {type === "CONFIRM_CODE" && (
              <FormField
                control={emailForm.control}
                name={"email" as Path<GetCodeType>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="email"
                        {...field}
                        className="form-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* Submit Button */}
            <Button
              className="form-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Image
                  src="/icons/loading-circle.svg"
                  alt="loading"
                  width={35}
                  height={35}
                />
              ) : (
                "Send Code"
              )}
            </Button>
          </form>
        </Form>
      )}

      {/* OTP input */}
      {type === "UPDATE_PASSWORD" && !isCodeValid && (
        <OtpForm onSubmit={verifyCode} isLoading={isLoading} />
      )}

      {/* New Password */}
      {type === "UPDATE_PASSWORD" && isCodeValid && (
        <Form {...ResetPasswordForm}>
          <form
            onSubmit={ResetPasswordForm.handleSubmit(resetPassword)}
            className="space-y-8"
          >
            <div className="space-y-6">
              <FormField
                control={ResetPasswordForm.control}
                name={"newPassword" as Path<ResetPasswordType>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="form-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ResetPasswordForm.control}
                name={"confirmPassword" as Path<ResetPasswordType>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="form-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="form-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Image
                  src="/icons/loading-circle.svg"
                  alt="loading"
                  width={35}
                  height={35}
                />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      )}

      <p className="text-sm font-normal text-center mt-2">
        Remember your password?{" "}
        <Link href="/sign-in" className="text-primary font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordForm;
