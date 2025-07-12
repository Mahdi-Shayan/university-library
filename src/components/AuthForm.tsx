"use client";

import {
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import OtpForm from "./OtpForm";
import { handleVerificationCode } from "@/lib/handleVerificationCode";
import { GetValidationCode } from "@/lib/validations";
import { useEmailContext } from "@/lib/contexts/emailContext";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  defaultValues: T;
}

interface OtpType {
  verificationCode: string;
}

function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const { setEmail, email } = useEmailContext();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const emailForm: UseFormReturn<{ email: string }> = useForm({
    resolver: zodResolver(GetValidationCode),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (type === "SIGN_UP" && email) {
      form.setValue("email" as Path<T>, email as PathValue<T, Path<T>>);
    }
  }, [defaultValues, email, form, type]);

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      setIsloading(true);
      const result = await onSubmit(data);

      if (result.success) {
        toast.success("Welcome to BookWise", {
          description: isSignIn
            ? "You have successfully signed in."
            : "You have successfully signed up.",
        });
        setEmail("");

        router.push("/");
      } else {
        toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`, {
          description: result.error ?? "An error occurred.",
        });

        console.log(result);
      }
    } catch (error) {
      toast.error("Server Error", { description: "Try again later." });
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  // sending verification code
  const sendCode = async (data: { email: string }) => {
    const savedExpiry = localStorage.getItem("otp-expiry-time");
    if (savedExpiry && parseInt(savedExpiry) > Date.now()) {
      setIsCodeSent(true);
      return;
    }
    try {
      setIsloading(true);
      const res = await handleVerificationCode(
        data,
        "/api/auth/signup-verification/send-code"
      );

      if (res.success) {
        setIsCodeSent(true);
        setEmail(data.email);
        localStorage.setItem("email", JSON.stringify(data.email));
        toast.success("Verification code sent successfully");
      } else {
        toast.error(res.error ?? "An error occurred.");
      }
    } catch (error) {
      toast.error("Server Error", { description: "Try again later." });
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  const verifyCode = async (data: OtpType) => {
    try {
      setIsloading(true);
      const res = await handleVerificationCode(
        data,
        "/api/auth/verify-code"
      );

      if (res.success) {
        setIsCodeVerified(true);
      } else {
        toast.error(
          res.error ? "invalid verification code" : "An error occurred."
        );
      }
    } catch (error) {
      toast.error("Server Error", { description: "Try again later." });
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold ">
        {isSignIn
          ? "Welcome Back to the BookWise"
          : "Create Your Library Account"}
      </h1>
      <p className="font-light text-light-500">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      {(!isSignIn && isCodeSent && isCodeVerified) || isSignIn ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {Object.keys(defaultValues).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <FileUploader
                          type="image"
                          variant="dark"
                          folder="ids"
                          accept="image/*"
                          placeholder="Upload a file"
                          onChangeField={field.onChange}
                        />
                      ) : (
                        <Input
                          required
                          readOnly={
                            type === "SIGN_UP" && field.name === "email"
                          }
                          type={
                            FIELD_TYPES[
                              field.name as keyof typeof FIELD_TYPES
                            ]
                          }
                          {...field}
                          className="form-input"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              className="form-btn"
              type="submit"
              disabled={isloading}
            >
              {isloading ? (
                <Image
                  src="/icons/loading-circle.svg"
                  alt="loading"
                  width={35}
                  height={35}
                />
              ) : isSignIn ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
      ) : null}
      {!isSignIn && isCodeSent && !isCodeVerified && (
        <OtpForm onSubmit={verifyCode} isLoading={isloading} />
      )}
      {!isSignIn && !isCodeSent && !isCodeVerified && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(sendCode)}
            className="space-y-8"
          >
            <FormField
              control={emailForm.control}
              name={"email" as Path<{ email: string }>}
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
            <Button
              className="form-btn"
              type="submit"
              disabled={isloading}
            >
              {isloading ? (
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
      {isSignIn && (
        <Link
          href="/reset-password"
          className="text-sm font-normal underline text-end"
        >
          Forgot your password?
        </Link>
      )}
      <p className="text-sm font-normal text-center mt-2">
        {isSignIn ? "New to BookWise?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "sign-in"}
          className="text-primary font-bold"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;
