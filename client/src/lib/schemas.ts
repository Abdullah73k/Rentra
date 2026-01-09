import { z } from "zod";

export const OptionalSectionsSchema = z.object({
	addLease: z.boolean().optional(),
	addTenant: z.boolean().optional(),
	addLoan: z.boolean().optional(),
});

export const PasswordSchema = z
	.string()
	.min(8, { message: "Password must be at least 8 characters" })
	.regex(/\d/, { message: "Password must contain at least one number (0-9)" })
	.regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
		message: "Password must contain at least one special character",
	})
	.regex(/[A-Z]/, {
		message: "Password must contain at least one uppercase letter",
	})
	.regex(/[a-z]/, {
		message: "Password must contain at least one lowercase letter",
	});

export const ReusableTypes = {
	uuid: z.uuid("Invalid UUID"),
	decimal: z
		.union([z.string(), z.number()])
		.transform((val) => val.toString())
		.refine(
			(val) => /^\d{1,10}(\.\d{1,2})?$/.test(val),
			"Invalid decimal format (max 10 digits, 2 decimals)"
		),
	date: z.string().or(z.date()),
	positiveInt2: z.number().int().min(0).max(32767),
	stringArray: z.array(z.string()),
	optionalString: z.string().optional(),
	dayOfMonth: z.number().int().min(1).max(31),
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
	valuationDate: ReusableTypes.date,
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
	furnishing: z.enum(["furnished", "semi-furnished", "unfurnished"]),
	parking: ReusableTypes.optionalString,
	lockerNumbers: ReusableTypes.stringArray,
	notes: ReusableTypes.optionalString,
});

export const documentSchema = z.object({
	id: ReusableTypes.uuid,
	userId: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid.optional(),
	tenantId: ReusableTypes.uuid.optional(),
	name: z.string(),
	type: z.enum(["photo", "document"]),
	path: z.string(),
	contentType: z.string(),
	sizeBytes: z
		.number()
		.int()
		.min(0)
		.max(1024 * 1024 * 10),
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
	phone: z.string().optional(),
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
	paymentDay: ReusableTypes.dayOfMonth,
	deposit: ReusableTypes.decimal,
});

export const propertyDataSchema = z.object({
	property: propertySchema,
	propertyInfo: propertyInfoSchema,
	optionalSections: OptionalSectionsSchema,
	loan: loanSchema.optional(),
	tenant: tenantSchema.optional(),
	lease: leaseSchema.optional(),
});

export const transactionSchema = z.object({
	propertyId: ReusableTypes.uuid,
	leaseId: ReusableTypes.uuid.optional(),
	type: z.enum(["income", "expense"]),
	subcategory: ReusableTypes.optionalString,
	amount: ReusableTypes.decimal,
	currency: ReusableTypes.currency,
	taxRate: z
		.string()
		.regex(
			/^\d{1,3}(\.\d{1,2})?$/,
			"Invalid tax rate format (max 3 digits, 2 decimals)"
		),
	taxAmount: z
		.string()
		.regex(
			/^\d{1,8}(\.\d{1,2})?$/,
			"Invalid tax amount format (max 8 digits, 2 decimals)"
		),
	fxRateToBase: z
		.string()
		.regex(
			/^\d{1,4}(\.\d{1,6})?$/,
			"Invalid fx rate format (max 4 digits, 6 decimals)"
		),
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

export const patchPropertySchema = propertySchema.extend({
	id: ReusableTypes.uuid,
	createdAt: z.string().or(z.date()).optional(),
	updatedAt: z.string().or(z.date()).optional(),
});

export const patchPropertyInfoSchema = propertyInfoSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
	createdAt: z.string().or(z.date()).optional(),
	updatedAt: z.string().or(z.date()).optional(),
});

export const patchDocumentSchema = documentSchema.extend({
	id: ReusableTypes.uuid,
});

export const patchLoanSchema = loanSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
});

export const patchTenantSchema = tenantSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
});

export const patchLeaseSchema = leaseSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
	tenantId: ReusableTypes.uuid,
});

export const patchTransactionSchema = transactionSchema.extend({
	id: ReusableTypes.uuid,
});

export const patchPropertyDataSchema = z.object({
	property: patchPropertySchema,
	propertyInfo: patchPropertyInfoSchema,
	optionalSections: OptionalSectionsSchema,
	loan: patchLoanSchema.optional(),
	tenant: patchTenantSchema.optional(),
	lease: patchLeaseSchema.optional(),
});
