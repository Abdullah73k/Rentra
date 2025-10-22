import { z } from "zod";

// Reusable bits
const uuid = z.string().uuid("Invalid UUID");

// Uppercase 3-letter currency, e.g., "usd" -> "USD"
const currency3 = z
  .string()
  .length(3, "Currency must be ISO-4217 (3 letters)")
  .transform((v) => v.toUpperCase());

// Trimmed non-empty string
const nonEmptyTrimmed = z.string().trim().min(1);

// ISO date string -> Date (kept same pattern you used in transactions)
const isoDateToDate = z.iso
  .date()
  .transform((dateStr) => new Date(dateStr));

// Optional ISO date string -> Date
const optionalIsoDateToDate = z
  .string()
  .optional()
  .transform((v) => (v ? new Date(v) : undefined));

// Optional URL string
const optionalUrl = z.string().url().optional();

// Optional trimmed string
const optionalTrimmedStr = z.string().trim().optional();

// Coerced safe non-negative number
const nn = z.coerce.number().nonnegative();

// Coerced safe integer >= 0
const intNN = z.coerce.number().int().nonnegative();

// Coerced boolean (accepts "true"/"false", 1/0, etc.)
const boolC = z.coerce.boolean().optional();

/* --------------------------
   Property
--------------------------- */
export const propertySchema = z.object({
  id: uuid,
  userId: uuid,
  name: nonEmptyTrimmed,              // trimmed
  type: nonEmptyTrimmed,              // you can later swap to enum if you finalize types
  address: nonEmptyTrimmed,           // trimmed
  country: nonEmptyTrimmed,           // keep as free text for now; you can map to ISO on UI
  currency: currency3,                // UPPERCASE, length 3
  purchasePrice: nn,                  // coerced number
  closingCosts: nn.optional(),        // coerced number
  acquisitionDate: optionalIsoDateToDate, // -> Date | undefined
  currentValue: nn.optional(),        // coerced number
  photos: optionalUrl,                // url()
  ownershipDocs: optionalTrimmedStr,
  closingDocs: optionalTrimmedStr,
  purchaseContract: optionalTrimmedStr,
  tacDoc: optionalTrimmedStr,
  insuranceDoc: optionalTrimmedStr,
  otherDocs: optionalTrimmedStr,
  sold: z.coerce.boolean().optional(), // coerced boolean
});

/* --------------------------
   Property Info
--------------------------- */
export const propertyInfoSchema = z.object({
  id: uuid,
  propertyId: uuid,
  label: nonEmptyTrimmed,
  bedrooms: intNN,                    // coerced int >= 0
  bathrooms: intNN,                   // coerced int >= 0
  size: nn.optional(),                // coerced number
  status: z.string().trim().optional(),
  furnished: boolC,                   // coerced boolean
  parking: optionalTrimmedStr,
  lockerNumber: optionalTrimmedStr,
  notes: z.string().trim().max(2000).optional(), // trimmed + soft cap
});

/* --------------------------
   Loan
--------------------------- */
export const loanSchema = z.object({
  id: uuid,
  propertyId: uuid,
  lender: nonEmptyTrimmed,
  monthlyMortgage: nn,                // coerced number
  totalMortgageAmount: nn.optional(), // coerced number
  monthlyMortgageValue: nn.optional(),// coerced number (if this is duplicate of monthlyMortgage consider removing)
  // keep as fraction 0..1 like taxRate? If you prefer %, keep 0..100
  interestRate: z.coerce.number().min(0).max(100).optional(),
});

/* --------------------------
   Tenant
--------------------------- */
export const tenantSchema = z.object({
  id: uuid,
  propertyId: uuid,
  name: nonEmptyTrimmed,
  // Prefer phone as trimmed string (so you can keep +, spaces, parentheses)
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+().\-\s]{7,20}$/, "Invalid phone")
    .optional(),
  email: z.string().email().optional(),
  idDoc: optionalTrimmedStr,
  draftCheck: optionalTrimmedStr,
  tenancyContract: optionalTrimmedStr,
  otherDocs: optionalTrimmedStr,
});

/* --------------------------
   Lease
--------------------------- */
export const leaseSchema = z.object({
  id: uuid,
  propertyId: uuid,
  tenantId: uuid,
  // keep consistent with transactions: ISO -> Date
  start: isoDateToDate,
  end: isoDateToDate,
  rentAmount: nn,                     // coerced number
  currency: currency3,                // UPPERCASE, length 3
  // if you standardize later: z.enum(["monthly","weekly","yearly"]) etc.
  freq: nonEmptyTrimmed,
  // Store as day-of-month number 1..31 if that’s your model
  paymentDay: z.coerce.number().int().min(1).max(31)
    .or(z.string().trim().length(0)) // allow "" if you want it optional in UI
    .transform((v) => (typeof v === "string" ? undefined : v)),
  deposit: nn,                        // coerced number
});

export const postTransactionValidationSchema = z.object({
  propertyId: uuid,
  leaseId: uuid,
  type: z.enum(["income", "expense"]),
  subcategory: z.string(),
  amount: z.coerce.number<string>().nonnegative(),
  currency: z
    .string()
    .length(3)
    .transform((val) => val.toUpperCase()),
  taxRate: z.coerce.number<string>().nonnegative().min(0).max(1),
  taxAmount: z.coerce.number<string>().nonnegative().min(0),
  date: z.iso.date().transform((date) => new Date(date)),
  from: z.string().min(1),
  to: z.string().min(1),
  method: z.string().min(1),
  notes: z.string().max(1000).optional(),
});

export const patchTransactionValidationSchema = postTransactionValidationSchema.extend({
  id: uuid,
});

/* --------------------------
   Post/Patch wrappers
--------------------------- */
export const postPropertyInfoValidationSchema = z.object({
  property: propertySchema,
  propertyInfo: propertyInfoSchema,
  loan: loanSchema.optional(),
  tenant: tenantSchema.optional(),
  lease: leaseSchema.optional(),
});

export const patchPropertyInfoValidationSchema = z.object({
  property: propertySchema.partial().optional(),
  propertyInfo: propertyInfoSchema.partial().optional(),
  loan: loanSchema.partial().optional(),
  tenant: tenantSchema.partial().optional(),
  lease: leaseSchema.partial().optional(),
});
