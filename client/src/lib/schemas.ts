import { z } from "zod"


export const PropertySchema = z.object({
    purpose: z.string(),
    type: z.string(),
    address: z.string(),
    country: z.string(),
    currency: z.string(),
    purchasePrice: z.number(),
    closingCosts: z.number(),
    acquisitionDate: z.string(),
    currentValue: z.number(),
    valuationDate: z.string(),
    sold: z.boolean().optional(),
});

export const PropertyInfoSchema = z.object({
    propertyNumber: z.string(),
    bedrooms: z.number(),
    bathrooms: z.number(),
    sizeSqm: z.number(),
    status: z.string(),
    furnishing: z.string(),
    parking: z.string().optional(),
    notes: z.string().optional(),
});

export const OptionalSectionsSchema = z.object({
    addLease: z.boolean(),
    addTenant: z.boolean(),
    addLoan: z.boolean(),
});

export const TenantSchema = z.object({
    tenantName: z.string(),
    tenantPhone: z.string().optional(),
    tenantEmail: z.string(),
});

export const LeaseSchema = z.object({
    leaseStart: z.string(),
    leaseEnd: z.string(),
    rentAmount: z.number(),
    frequency: z.string(),
    paymentDay: z.number().min(1).max(31),
    deposit: z.number().min(0),
});

export const LoanSchema = z.object({
    lender: z.string(),
    termMonths: z.number(),
    monthlyPayment: z.number(),
    totalMortgageAmount: z.number(),
    interestRate: z.number().min(0).max(100),
});
