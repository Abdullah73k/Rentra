import type { Transaction, WithId } from "@/lib/types";
import { create } from "zustand";

type PropertyStore = {
  isAddTransactionOpen: boolean;
  setIsAddTransactionOpen: (isAddTransactionOpen: boolean) => void;
  isEditTransactionOpen: boolean;
  setIsEditTransactionOpen: (isEditTransactionOpen: boolean) => void;
  isEditPropertyOpen: boolean;
  setIsEditPropertyOpen: (isEditPropertyOpen: boolean) => void;
  editPropertyStep: number;
  setEditPropertyStep: (editPropertyStep: number) => void;
  lockerNumArray: string[];
  setLockerNumArray: (lockerNumArray: string[]) => void;
  currentTransaction: WithId<Transaction> | null;
  setCurrentTransaction: (transaction: WithId<Transaction>) => void;
  isAddTenantOpen: boolean;
  setIsAddTenantOpen: (isAddTenantOpen: boolean) => void;
  isAddLoanOpen: boolean;
  setIsAddLoanOpen: (isAddLoanOpen: boolean) => void;
};

export const usePropertyStore = create<PropertyStore>((set) => ({
  isAddTransactionOpen: false,
  setIsAddTransactionOpen: (isAddTransactionOpen: boolean) =>
    set({ isAddTransactionOpen }),
  isEditTransactionOpen: false,
  setIsEditTransactionOpen: (isEditTransactionOpen: boolean) =>
    set({ isEditTransactionOpen }),
  isEditPropertyOpen: false,
  setIsEditPropertyOpen: (isEditPropertyOpen: boolean) =>
    set({ isEditPropertyOpen }),
  editPropertyStep: 1,
  setEditPropertyStep: (editPropertyStep: number) => set({ editPropertyStep }),
  lockerNumArray: [],
  setLockerNumArray: (lockerNumArray: string[]) => set({ lockerNumArray }),
  currentTransaction: null,
  setCurrentTransaction: (currentTransaction: WithId<Transaction>) =>
    set({ currentTransaction }),
  isAddTenantOpen: false,
  setIsAddTenantOpen: (isAddTenantOpen: boolean) => set({ isAddTenantOpen }),
  isAddLoanOpen: false,
  setIsAddLoanOpen: (isAddLoanOpen: boolean) => set({ isAddLoanOpen }),
}));
