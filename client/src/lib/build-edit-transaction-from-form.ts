import { patchTransactionSchema } from "./schemas";
import { z } from "zod";

export function buildEditTransactionFromForm(
  formData: z.input<typeof patchTransactionSchema>,
  taxAmount: number
): z.input<typeof patchTransactionSchema> {
  return {
    id: formData.id,
    propertyId: formData.propertyId,
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
