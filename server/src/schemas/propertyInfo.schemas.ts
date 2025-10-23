import { z } from "zod";

const uuid = z.uuid("Invalid UUID");

const date = z.iso.date().transform((date) => new Date(date))

const nonNegativeNumber = z.coerce.number<string>().nonnegative()

const propertySchema = z.object({
	userId: uuid,
	name: z.string().min(1),
	type: z.enum(["house", "apartment", "villa", "penthouse", "townhouse", "duplex", "studio", "loft", "farm", "warehouse", "office", "retail", "land"]),
	address: z.string().min(1),
	country: z.string().min(1),
	currency: z.string().min(1),
	purchasePrice: nonNegativeNumber,
	closingCosts: nonNegativeNumber.optional(),
	acquisitionDate: date,
	currentValue: nonNegativeNumber.optional(),
	photos: z.url().optional(),
	ownershipDocs: z.string().optional(),
	closingDocs: z.string().optional(),
	purchaseContract: z.string().optional(),
	tacDoc: z.string().optional(),
	insuranceDoc: z.string().optional(),
	otherDocs: z.string().optional(),
	sold: z.boolean().optional(),
});

const propertyInfoSchema = z.object({
	propertyId: uuid,
	label: z.string().min(1),
	bedrooms: nonNegativeNumber.int(),
	bathrooms: nonNegativeNumber.int(),
	size: nonNegativeNumber.optional(),
	status: z.enum(["active", "under_renovation", "rented", "vacant", "sold", "under_offer", "off_market"]),
	furnished: z.boolean().optional(),
	parking: z.string().optional(),
	lockerNumber: nonNegativeNumber.optional(),
	notes: z.string().optional(),
});

const loanSchema = z.object({
	propertyId: uuid,
	lender: z.string().min(1),
	monthlyMortgage: nonNegativeNumber,
	totalMortgageAmount: nonNegativeNumber,
	monthlyMortgageValue: nonNegativeNumber,
	interestRate: nonNegativeNumber.max(100).optional(),
});

const tenantSchema = z.object({
	propertyId: uuid,
	name: z.string().min(1),
	phone: nonNegativeNumber,
	email: z.email().optional(),
	idDoc: z.string().optional(),
	draftCheck: z.string().optional(),
	tenancyContract: z.string().optional(),
	otherDocs: z.string().optional(),
});

const leaseSchema = z.object({
	propertyId: uuid,
	tenantId: uuid,
	start: date, 
	end: date,
	rentAmount: nonNegativeNumber,
	currency: z.string(),
	freq: z.enum(['biweekly','monthly','weekly','yearly', 'quarterly', 'semi_annually']),
	paymentDay: z.string(),
	deposit: nonNegativeNumber,
});

export const postTransactionValidationSchema = z.object({
	propertyId: uuid,
	leaseId: uuid,
	type: z.enum(["income", "expense"]),
	subcategory: z.string(),
	amount: nonNegativeNumber,
	currency: z
		.string()
		.length(3)
		.transform((val) => val.toUpperCase()),
	taxRate: nonNegativeNumber.max(1),
	taxAmount: nonNegativeNumber,
	date: date, // Validate ISO Date string then transform to Date Type using Date object to store in DB
	from: z.string().min(1),
	to: z.string().min(1),
	method: z.string().min(1),
	notes: z.string().max(1000).optional(),
});

export const patchTransactionValidationSchema = postTransactionValidationSchema.extend({
	id: uuid
})

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
