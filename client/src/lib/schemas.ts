import { z } from "zod"


// export const PropertySchema = z.object({
//     purpose: z.string(),
//     type: z.string(),
//     address: z.string(),
//     country: z.string(),
//     currency: z.string(),
//     purchasePrice: z.number(),
//     closingCosts: z.number(),
//     acquisitionDate: z.string(),
//     currentValue: z.number(),
//     valuationDate: z.string(),
//     sold: z.boolean().optional(),
// });

// export const PropertyInfoSchema = z.object({
//     propertyNumber: z.string(),
//     bedrooms: z.number(),
//     bathrooms: z.number(),
//     sizeSqm: z.number(),
//     status: z.string(),
//     furnishing: z.string(),
//     parking: z.string().optional(),
//     notes: z.string().optional(),
// });

export const OptionalSectionsSchema = z.object({
    addLease: z.boolean(),
    addTenant: z.boolean(),
    addLoan: z.boolean(),
});

// export const TenantSchema = z.object({
//     tenantName: z.string(),
//     tenantPhone: z.string().optional(),
//     tenantEmail: z.string(),
// });

// export const LeaseSchema = z.object({
//     leaseStart: z.string(),
//     leaseEnd: z.string(),
//     rentAmount: z.number(),
//     frequency: z.string(),
//     paymentDay: z.number().min(1).max(31),
//     deposit: z.number().min(0),
// });

// export const LoanSchema = z.object({
//     lender: z.string(),
//     termMonths: z.number(),
//     monthlyPayment: z.number(),
//     totalMortgageAmount: z.number(),
//     interestRate: z.number().min(0).max(100),
// });

export const PasswordSchema = z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/\d/, { message: 'Password must contain at least one number (0-9)' })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' });

export const ReusableTypes = {
    uuid: z.uuid("Invalid UUID"),
    decimal: z.number().min(0).max(9999999999.99),
    date: z.iso.date(),
    positiveInt2: z.number().int().min(0).max(32767),
    stringArray: z.array(z.string()),
    optionalString: z.string().optional(),
    currency: z.string().length(3).uppercase(),
};

export const propertySchema = z.object({
    userId: ReusableTypes.uuid,
    purpose: z.enum(["personal", "investment"]),
    type: z.enum([
        "house",
        "apartment",
        "villa",
        "penthouse",
        "townhouse",
        "duplex",
        "triplex",
        "studio",
    ]),
    address: z.string().min(1),
    country: z.string().min(1),
    currency: ReusableTypes.currency,
    purchasePrice: ReusableTypes.decimal,
    closingCosts: ReusableTypes.decimal,
    acquisitionDate: ReusableTypes.date,
    currentValue: ReusableTypes.decimal,
    photos: ReusableTypes.stringArray,
    sold: z.boolean(),
});

export const propertyInfoSchema = z.object({
    propertyNumber: z.string().min(1),
    bedrooms: ReusableTypes.positiveInt2,
    bathrooms: ReusableTypes.decimal,
    sizeSqm: ReusableTypes.decimal,
    status: z.enum([
        "available",
        "rented",
        "maintenance",
        "off_market",
        "reserved",
    ]),
    furnished: z.enum(["furnished", "semi-furnished", "unfurnished"]),
    parking: ReusableTypes.optionalString,
    lockerNumber: ReusableTypes.stringArray,
    notes: ReusableTypes.optionalString,
});

export const documentSchema = z.object({
    propertyId: ReusableTypes.uuid,
    tenantId: ReusableTypes.uuid.optional(),
    name: z.string(),
    path: z.string(),
});

export const loanSchema = z.object({
    lender: z.string().min(1),
    termMonths: ReusableTypes.positiveInt2,
    monthlyPayment: ReusableTypes.decimal,
    totalMortgageAmount: ReusableTypes.decimal,
    interestRate: ReusableTypes.decimal,
});

export const tenantSchema = z.object({
    name: z.string().min(1),
    phone: z.number().optional(),
    email: z.email(),
});

export const leaseSchema = z.object({
    start: ReusableTypes.date,
    end: ReusableTypes.date,
    rentAmount: ReusableTypes.decimal,
    currency: ReusableTypes.currency,
    frequency: z.enum([
        "weekly",
        "bi-weekly",
        "monthly",
        "bi-monthly",
        "quarterly",
        "annually",
        "bi-annually",
    ]),
    paymentDay: ReusableTypes.positiveInt2,
    deposit: ReusableTypes.decimal,
});

export const transactionSchema = z.object({
    propertyId: ReusableTypes.uuid,
    leaseId: ReusableTypes.uuid.optional(),
    type: z.enum(["income", "expense"]),
    subcategory: ReusableTypes.optionalString,
    amount: ReusableTypes.decimal,
    currency: ReusableTypes.currency,
    taxRate: z.number().min(0).max(1),
    taxAmount: z.number().min(0),
    fxRateToBase: z.number().min(0).max(9999999999.999999),
    from: z.string().min(1),
    to: z.string().min(1),
    method: z.enum([
        "bank_transfer",
        "cash",
        "check",
        "credit_card",
        "debit_card",
    ]),
    date: ReusableTypes.date, // Validate ISO Date string then transform to Date Type using Date object to store in DB
    notes: z.string().max(1000).optional(),
});

export const propertyDataSchema = z.object({
    property: propertySchema,
    propertyInfo: propertyInfoSchema,
    optionalSections: OptionalSectionsSchema,
    loan: loanSchema.optional(),
    tenant: tenantSchema.optional(),
    lease: leaseSchema.optional(),
});