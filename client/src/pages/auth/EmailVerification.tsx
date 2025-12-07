import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth-client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const EmailVerification = () => {
  const { email } = useParams();

  if (!email) {
    return (
      <div className="space-y-4" role="alert">
        <h2 className="text-lg font-semibold">Verification Error</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Sorry, something went wrong with the verification. Please try again.
        </p>
      </div>
    );
  }

  const [timeToNextResend, setTimeToNextResend] = useState(30);
  const interval = useRef<number | undefined>(undefined);

  useEffect(() => {
    startEmailVerificationCountdown();
    return () => {
      if (interval.current !== undefined) {
        clearInterval(interval.current);
      }
    };
  }, []);

  function startEmailVerificationCountdown(time = 30) {
    if (interval.current !== undefined) {
      clearInterval(interval.current);
    }
    setTimeToNextResend(time);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;
        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Verify Your Email</h1>
      <p className="text-sm text-muted-foreground mt-2">
        We sent you a verification link. Please check your email and click the
        link to verify
      </p>

      {/* TODO: change to better auth action button when merged with main */}
      <Button
        variant="outline"
        className="w-full"
        disabled={timeToNextResend > 0}
        onClick={() => {
          startEmailVerificationCountdown();
          authClient.sendVerificationEmail({
            email,
            callbackURL: "/",
          });
        }}
      >
        {timeToNextResend > 0
          ? `Resend Email (${timeToNextResend})`
          : "Resend Email"}
      </Button>
    </div>
  );
};

export default EmailVerification;
