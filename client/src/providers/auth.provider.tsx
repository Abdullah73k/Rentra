import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { authClient } from "@/utils/auth-client";

type AuthProviderProps = { children: React.ReactNode };

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, isPending } = authClient.useSession();

  const setSession = useAuthStore((s) => s.setSession);
  const setIsPending = useAuthStore((s) => s.setIsPending);

  useEffect(() => {
    setIsPending(isPending);
    setSession(session);
  }, [isPending, session, setIsPending, setSession]);

  return <>{children}</>;
};

export default AuthProvider;
