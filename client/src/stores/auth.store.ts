import type { Session } from "@/lib/types";
import { create } from "zustand";

type AuthStore = {
    session: Session | null
    isPending: boolean;
    setSession: (session: Session | null) => void;
    setIsPending: (isPending: boolean) => void;
    reset: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    session: null,
    isPending: true,
    setSession: (session: Session | null) => set({ session }),
    setIsPending: (isPending: boolean) => set({ isPending }),
    reset: () => set({ session: null, isPending: false }),
}));
