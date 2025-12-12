import { v4 as uuidv4 } from "uuid";
import type { AddTransactionFormData } from "./types";

export interface TransactionPayload {
    [key: string]: any; // or your real Transaction type when you have it
}

export function buildTransactionFromForm(
    formData: AddTransactionFormData,
    propertyId: string,
    taxAmount: number
): TransactionPayload {
    const now = new Date().toISOString();

    return {
        id: uuidv4(),
        propertyId,
        type: formData.type,
        subcategory: formData.subcategory,
        amount: formData.amount,
        currency: formData.currency,
        taxRate: formData.taxRate,
        taxAmount,
        fxRateToBase: 1,
        from: formData.from,
        to: formData.to,
        method: formData.method,
        date: formData.date,
        notes: formData.notes || undefined,
        createdAt: now,
    };
}