import { z } from "zod";

const uuid = z.string().uuid("Invalid UUID");


const propertySchema = z.object({
  id: uuid,
  userId: uuid,
  name: z.string().min(1),
  type: z.string().min(1),
  address: z.string().min(1),
  country: z.string().min(1),
  currency: z.string().min(1),
  purchasePrice: z.number().nonnegative(),
  closingCosts: z.number().nonnegative().optional(),
  acquisitionDate: z.string().optional(),
  currentValue: z.number().optional(),
  photos: z.string().url().optional(),
  ownershipDocs: z.string().optional(),
  closingDocs: z.string().optional(),
  purchaseContract: z.string().optional(),
  tacDoc: z.string().optional(),
  insuranceDoc: z.string().optional(),
  otherDocs: z.string().optional(),
  sold: z.boolean().optional(),
});

const propertyInfoSchema = z.object({
  id: uuid,
  propertyId: uuid,
  label: z.string().min(1),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  size: z.number().nonnegative().optional(),
  status: z.string().optional(),
  furnished: z.boolean().optional(),
  parking: z.string().optional(),
  lockerNumber: z.string().optional(),
  notes: z.string().optional(),
});

const loanSchema = z.object({
  id: uuid,
  propertyId: uuid,
  lender: z.string().min(1),
  monthlyMorgage: z.number().nonnegative(),
  totalMorgageAmount: z.number().optional(),
  monthlyMorgageValue: z.number().optional(),
  interestRate: z.number().min(0).max(100).optional(),
});

const tenantSchema = z.object({
  id: uuid,
  propertyId: uuid,
  name: z.string().min(1),
  phone: z.number().optional(),
  email: z.string().email().optional(),
  idDoc: z.string().optional(),
  draftCheck: z.string().optional(),
  tenancyContract: z.string().optional(),
  otherDocs: z.string().optional(),
});

const leaseSchema = z.object({
  id: uuid,
  propertyId: uuid,
  tentantId: uuid,
  start: z.string(), // ISO date strings can also use z.string().datetime()
  end: z.string(),
  rentAmount: z.string(), // string because your type said so, but consider z.number()
  currency: z.string(),
  freq: z.string(),
  paymentDay: z.string(),
  deposit: z.number().nonnegative(),
});

export const propertyInfoValidationSchema = z.object({
  property: propertySchema,
  propertyInfo: propertyInfoSchema,
  loan: loanSchema.optional(),
  tenant: tenantSchema.optional(),
  lease: leaseSchema.optional(),
});