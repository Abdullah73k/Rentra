// buildPropertyFromForm.ts
import { v4 as uuidv4 } from "uuid";
import type { AddPropertyFormData } from "./types";

export interface PropertyPayload {
  // you can type this properly later, keeping `any` is also fine for now
  [key: string]: any;
}

export function buildPropertyFromForm(formData: AddPropertyFormData): PropertyPayload {
  const propertyId = uuidv4();
  const tenantId = formData.addTenant ? uuidv4() : undefined;
  const now = new Date().toISOString();

  return {
    id: propertyId,
    purpose: formData.purpose,
    type: formData.type,
    address: formData.address,
    country: formData.country,
    currency: formData.currency,
    purchasePrice: formData.purchasePrice,
    closingCosts: formData.closingCosts,
    acquisitionDate: formData.acquisitionDate,
    currentValue: formData.currentValue,
    valuationDate: formData.valuationDate,
    sold: formData.sold,
    photos: [],
    createdAt: now,
    info: {
      id: uuidv4(),
      propertyId,
      propertyNumber: formData.propertyNumber,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      sizeSqm: formData.sizeSqm,
      status: formData.status,
      furnishing: formData.furnishing,
      parking: formData.parking || undefined,
      notes: formData.notes || undefined,
    },
    tenant: formData.addTenant
      ? {
          id: tenantId,
          propertyId,
          name: formData.tenantName,
          phone: formData.tenantPhone || undefined,
          email: formData.tenantEmail,
          createdAt: now,
        }
      : undefined,
    lease: formData.addLease
      ? {
          id: uuidv4(),
          propertyId,
          tenantId,
          start: formData.leaseStart,
          end: formData.leaseEnd,
          rentAmount: formData.rentAmount,
          currency: formData.leaseCurrency,
          frequency: formData.frequency,
          paymentDay: formData.paymentDay,
          deposit: formData.deposit,
          createdAt: now,
        }
      : undefined,
    loan: formData.addLoan
      ? {
          id: uuidv4(),
          propertyId,
          lender: formData.lender,
          termMonths: formData.termMonths,
          monthlyPayment: formData.monthlyPayment,
          totalMortgageAmount: formData.totalMortgageAmount,
          interestRate: formData.interestRate,
          createdAt: now,
        }
      : undefined,
  };
}
