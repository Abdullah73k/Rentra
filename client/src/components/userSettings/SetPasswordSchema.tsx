import { authClient } from "@/utils/auth-client";
import BetterAuthActionButton from "../form/BetterAuthActionButton";
import { CardDescription } from "../ui/card";
import type { Session } from "@/lib/types";

const SetPasswordSchema = ({userInfo}: {userInfo: NonNullable<Session>["user"]}) => {
  return (
    <>
      <CardDescription>Request a password reset link via email</CardDescription>
      <BetterAuthActionButton
        successMessage="Password reset email sent"
        action={() => {
          return authClient.requestPasswordReset({
            email: userInfo.email,
            redirectTo: "/auth/reset-password",
          });
        }}
      >
        Send a password reset email
      </BetterAuthActionButton>
    </>
  );
};

export default SetPasswordSchema;
