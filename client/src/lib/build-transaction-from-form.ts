import type { Transaction } from "./types";

export function buildTransactionFromForm(
	formData: Transaction,
	propertyId: string,
	taxAmount: number
): Transaction {
	return {
		propertyId,
		type: formData.type,
		subcategory: formData.subcategory,
		amount: formData.amount,
		currency: formData.currency,
		taxRate: formData.taxRate,
		taxAmount: taxAmount.toString(),
		fxRateToBase: "1",
		from: formData.from,
		to: formData.to,
		method: formData.method,
		date: formData.date,
		notes: formData.notes || undefined,
	};
}
