"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Otp } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import ResendCodeTimer from "./ResendCodeTimer";
import { Button } from "./ui/button";
import Image from "next/image";

interface OtpType {
  verificationCode: string;
}

interface Props {
  onSubmit: (data: OtpType) => Promise<void>;
  isLoading: boolean;
}

function OtpForm({ onSubmit, isLoading }: Props) {
  const OtpForm = useForm<{
    verificationCode: string;
  }>({
    resolver: zodResolver(Otp),
    defaultValues: {
      verificationCode: "",
    },
  });
  return (
    <Form {...OtpForm}>
      <form
        onSubmit={OtpForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={OtpForm.control}
          name={"verificationCode" as Path<OtpType>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <ResendCodeTimer />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="form-btn" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Image
              src="/icons/loading-circle.svg"
              alt="loading"
              width={35}
              height={35}
            />
          ) : (
            "Verify Code"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default OtpForm;
