import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { authClient } from "@/utils/auth-client";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, isPending } = authClient.useSession();

  const setSession = useAuthStore((state) => state.setSession);
  const setIsPending = useAuthStore((state) => state.setIsPending);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    setSession(session);
    setIsPending(isPending);
    setIsAuthenticated(!!session);
  }, [session, isPending, setSession, setIsPending, setIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
