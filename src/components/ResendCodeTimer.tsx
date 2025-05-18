"use client";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "sonner";

const TIMER_KEY = "otp-expiry-time";

function ResendCodeTimer() {
  const [resendActive, setResendActive] = useState(false);
  const [expiryTime, setExpiryTime] = useState<number | null>(null);

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
    const res = await fetch("/api/auth/reset-password?resend=true", {
      body: JSON.stringify(""),
      method: "POST",
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
  };

  if (!expiryTime) return null;

  return (
    <div className="space-x-2 text-center mt-5">
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
        {resendActive && "Resend Code"}
      </button>
    </div>
  );
}

export default ResendCodeTimer;
