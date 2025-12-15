import type { Session } from "@/lib/types";
import { create } from "zustand";

type AuthStore = {
    session: Session
    isPending: boolean;
    isAuthenticated: boolean
    setSession: (session: Session | null) => void;
    setIsPending: (isPending: boolean) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void
    reset: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    session: null,
    isPending: true,
    isAuthenticated: false,
    setSession: (session: Session | null) => set({ session }),
    setIsPending: (isPending: boolean) => set({ isPending }),
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    reset: () => set({ session: null, isPending: false }),
}));
