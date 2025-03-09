"use client";

import {
  DefaultValues,
  FieldValues,
  Path,
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

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  defaultValues: T;
}

function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast.custom(() => (
        <div className="bg-dark-300 text-white p-5 text-[14px] rounded-md w-90">
          <h2>Welcome to BookWise</h2>
          <p className="text-light-100 text-[13px] mt-1">
            {isSignIn
              ? "You have successfully signed in."
              : "You have successfully signed up."}
          </p>
        </div>
      ));

      router.push("/");
    } else {
      toast.custom(() => (
        <div className="bg-red-700 text-white p-5 text-[14px] rounded-md w-90">
          <h2>Error {isSignIn ? "signing in" : "signing up"}</h2>
          <p className="text-light-100 text-[13px] mt-1">
            {result.error ?? "An error occurred."}
          </p>
        </div>
      ));
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
          <Button className="form-btn" type="submit">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>
      <p className="text-sm font-normal text-center mt-5">
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
