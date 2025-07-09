"use client";

import { useEmailContext } from "@/lib/contexts/emailContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "sonner";

const TIMER_KEY = "otp-expiry-time";

function ResendCodeTimer() {
  const [resendActive, setResendActive] = useState(false);
  const [expiryTime, setExpiryTime] = useState<number | null>(null);
  const { email, setEmail } = useEmailContext();
  const [isLoading, setIsLoding] = useState<boolean>(false);

  useEffect(() => {
    const savedExpiry = localStorage.getItem(TIMER_KEY);
    if (savedExpiry && parseInt(savedExpiry) > Date.now()) {
      setExpiryTime(parseInt(savedExpiry));
    } else {
      const newExpiry = Date.now() + 1000 * 90;
      localStorage.setItem(TIMER_KEY, newExpiry.toString());
      setExpiryTime(newExpiry);
    }
  }, []);

  const handleResend = async () => {
    try {
      setIsLoding(true);
      const res = await fetch("/api/auth/verify-code/resend", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to resend code");
        return;
      }

      const newExpiry = Date.now() + 1000 * 90;
      localStorage.setItem(TIMER_KEY, newExpiry.toString());
      setExpiryTime(newExpiry);
      setResendActive(false);
      toast.success("Reset code resent successfully");
      setEmail("");
      localStorage.removeItem("email");
    } catch (error) {
      console.error("Error resending code:", error);
    } finally {
      setIsLoding(false);
    }
  };

  if (!expiryTime) return null;

  return (
    <div className="space-x-2 text-center mt-5 flex justify-center">
      <Countdown
        key={expiryTime}
        date={expiryTime}
        onComplete={() => setResendActive(true)}
        renderer={({ minutes, seconds }) => (
          <span className="text-gray-400">
            resend code until:{" "}
            {!resendActive &&
              `${minutes}:${seconds.toString().padStart(2, "0")}`}
          </span>
        )}
      />

      <button
        onClick={handleResend}
        disabled={!resendActive}
        className="disabled:opacity-50 disabled:cursor-no-drop cursor-pointer underline text-light-100"
      >
        {isLoading ? (
          <Image
            src="/icons/loading-circle.svg"
            alt="loading"
            width={25}
            height={25}
          />
        ) : (
          resendActive && "Resend Code"
        )}
      </button>
    </div>
  );
}

export default ResendCodeTimer;
