import { z } from "zod";

const uuid = z.uuid("Invalid UUID");
const decimal = z.coerce.number<string>().min(0).max(9999999999.99);
const date = z.iso.date().transform((date) => new Date(date));
const positiveInt2 = z.coerce.number<string>().int().min(0).max(32767);
const stringArray = z.array(z.string());
const optionalString = z.string().optional();
const currency = z.string().length(3).uppercase();

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
	photos: stringArray,
	sold: z.coerce.boolean<"true" | "false">(),
});

const propertyInfoSchema = z.object({
	id: uuid,
	propertyId: uuid,
	propertyNumber: z.string().min(1),
	bedrooms: positiveInt2,
	bathrooms: decimal,
	sizeSqm: decimal,
	status: z.enum([
		"available",
		"rented",
		"maintenance",
		"off_market",
		"reserved",
	]),
	furnished: z.enum(["furnished", "semi-furnished", "unfurnished"]),
	parking: optionalString,
	lockerNumber: stringArray,
	notes: optionalString,
});

const documentSchema = z.object({
	id: uuid,
	propertyId: uuid,
	tenantId: uuid.optional(),
	name: z.string(),
	path: z.string(),
});

const loanSchema = z.object({
	id: uuid,
	propertyId: uuid,
	lender: z.string().min(1),
	termMonths: positiveInt2,
	monthlyPayment: decimal,
	totalMortgageAmount: decimal,
	interestRate: decimal,
});

const tenantSchema = z.object({
	id: uuid,
	propertyId: uuid,
	name: z.string().min(1),
	phone: z.number().optional(),
	email: z.email(),
});

const leaseSchema = z.object({
	id: uuid,
	propertyId: uuid,
	tenantId: uuid,
	start: date,
	end: date,
	rentAmount: decimal,
	currency: currency,
	frequency: z.enum([
		"weekly",
		"bi-weekly",
		"monthly",
		"bi-monthly",
		"quarterly",
		"annually",
		"bi-annually",
	]),
	paymentDay: positiveInt2,
	deposit: decimal,
});

export const postTransactionValidationSchema = z.object({
	propertyId: uuid,
	leaseId: uuid.optional(),
	type: z.enum(["income", "expense"]),
	subcategory: z.string().optional(),
	amount: decimal,
	currency: currency,
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
	date: date, // Validate ISO Date string then transform to Date Type using Date object to store in DB
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
