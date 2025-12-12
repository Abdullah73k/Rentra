import { authClient } from "@/utils/auth-client";
import BetterAuthActionButton from "./AuthActionButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PasskeyButton = () => {
  const navigate = useNavigate();
  const { refetch } = authClient.useSession();

  useEffect(() => {
    authClient.signIn.passkey(
      { autoFill: true },
      {
        onSuccess: () => {
          refetch();
          navigate("/properties/dashboard");
        },
      }
    );
  }, [refetch, navigate]);

  return (
    <BetterAuthActionButton
      variant="outline"
      className="w-full"
      action={() =>
        authClient.signIn.passkey(undefined, {
          onSuccess: () => {
            refetch();
            navigate("/properties/dashboard");
          },
        })
      }
    >
      Use Passkey
    </BetterAuthActionButton>
  );
};

export default PasskeyButton;
