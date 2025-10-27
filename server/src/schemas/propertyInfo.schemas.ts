import { z } from "zod";

const uuid = z.uuid("Invalid UUID");
const decimal = z.coerce.number<string>().min(0).max(9999999999.99);
const date = z.iso.date().transform((date) => new Date(date));

export const propertySchema = z.object({
	id: uuid,
	userId: uuid,
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
	currency: z.string().length(3).uppercase(),
	purchasePrice: decimal,
	closingCosts: decimal,
	acquisitionDate: date,
	currentValue: decimal,
	photos: z.array(z.string()),
	sold: z.coerce.boolean<"true" | "false">(),
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
	monthlyMortgage: z.number().nonnegative(),
	totalMortgageAmount: z.number().optional(),
	monthlyMortgageValue: z.number().optional(),
	interestRate: z.number().min(0).max(100).optional(),
});

const tenantSchema = z.object({
	id: uuid,
	propertyId: uuid,
	name: z.string().min(1),
	phone: z.number().optional(),
	email: z.email().optional(),
});

const leaseSchema = z.object({
	id: uuid,
	propertyId: uuid,
	tenantId: uuid,
	start: z.string(), // ISO date strings can also use z.string().datetime()
	end: z.string(),
	rentAmount: z.number(),
	currency: z.string(),
	freq: z.string(),
	paymentDay: z.string(),
	deposit: z.number().nonnegative(),
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
	date: date, // Validate ISO Date string then transform to Date Type using Date object to store in DB
	from: z.string().min(1),
	to: z.string().min(1),
	method: z.string().min(1),
	notes: z.string().max(1000).optional(),
});

export const patchTransactionValidationSchema =
	postTransactionValidationSchema.extend({
		id: uuid,
	});

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
