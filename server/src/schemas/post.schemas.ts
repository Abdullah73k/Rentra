import z from "zod";
import { ReusableTypes } from "./reusable.schemas.js";

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
	sold: z.coerce.boolean<"true" | "false">(),
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
	subcategory: z.string().optional(),
	amount: ReusableTypes.decimal,
	currency: ReusableTypes.currency,
	taxRate: z.coerce.number<string>().min(0).max(1),
	taxAmount: z.coerce.number<string>().min(0),
	fxRateToBase: z.coerce.number<string>().min(0).max(9999999999.999999),
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
	loan: loanSchema.optional(),
	tenant: tenantSchema.optional(),
	lease: leaseSchema.optional(),
});
