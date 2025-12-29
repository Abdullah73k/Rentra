import { create } from "zustand";

type PropertyStore = {
	isAddTransactionOpen: boolean;
	setIsAddTransactionOpen: (isAddTransactionOpen: boolean) => void;
	isEditPropertyOpen: boolean;
	setIsEditPropertyOpen: (isEditPropertyOpen: boolean) => void;
};

export const usePropertyStore = create<PropertyStore>((set) => ({
	isAddTransactionOpen: false,
	setIsAddTransactionOpen: (isAddTransactionOpen: boolean) =>
		set({ isAddTransactionOpen }),
	isEditPropertyOpen: false,
	setIsEditPropertyOpen: (isEditPropertyOpen: boolean) =>
		set({ isEditPropertyOpen }),
}));
