import type { ReactNode } from "react";
import BetterAuthActionButton from "./BetterAuthActionButton";
import { authClient } from "@/utils/auth-client";

const OauthButton = ({
  children,
  provider,
}: {
  children: ReactNode;
  provider: "google" | "github" | "discord";
}) => {
  return (
    <BetterAuthActionButton
      action={() => {
        return authClient.signIn.social({
          provider,
          callbackURL: "/properties/dashboard",
        });
      }}
      type="button"
      variant="outline"
      className="h-12 flex-1 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-black hover:text-white"
    >
      {children}
    </BetterAuthActionButton>
  );
};

export default OauthButton;
