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

export const PasswordSchema = z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/\d/, { message: 'Password must contain at least one number (0-9)' })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' });