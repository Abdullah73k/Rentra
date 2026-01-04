import type { Transaction } from "./types";
import { transactionSchema } from "./schemas";
import { z } from "zod";

export function buildTransactionFromForm(
  formData: z.input<typeof transactionSchema>,
  propertyId: string,
  taxAmount: number
): Transaction {
  return {
    propertyId,
    type: formData.type,
    subcategory: formData.subcategory,
    amount: String(formData.amount),
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
