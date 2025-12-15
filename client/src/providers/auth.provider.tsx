import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { authClient } from "@/utils/auth-client";

type AuthProviderProps = { children: React.ReactNode };

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, isPending } = authClient.useSession();

  const setSession = useAuthStore((s) => s.setSession);
  const setIsPending = useAuthStore((s) => s.setIsPending);

  const storeSession = useAuthStore((s) => s.session);
  const storePending = useAuthStore((s) => s.isPending);

  useEffect(() => {
    if (storePending !== isPending) setIsPending(isPending);
    if (storeSession !== session) setSession(session);
  }, [isPending, session, storePending, storeSession, setIsPending, setSession]);

  return <>{children}</>;
};

export default AuthProvider;
