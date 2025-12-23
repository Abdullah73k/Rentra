import { pgTable, foreignKey, uuid, text, char, numeric, date, boolean, timestamp, unique, check, smallint, varchar, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const frequency = pgEnum("Frequency", ['weekly', 'bi-weekly', 'monthly', 'bi-monthly', 'quarterly', 'annually', 'bi-annually'])
export const furnishing = pgEnum("Furnishing", ['furnished', 'semi-furnished', 'unfurnished'])
export const propertyPurpose = pgEnum("PropertyPurpose", ['personal', 'investment'])
export const propertyStatus = pgEnum("PropertyStatus", ['available', 'rented', 'maintenance', 'off_market', 'reserved'])
export const propertyType = pgEnum("PropertyType", ['house', 'apartment', 'villa', 'penthouse', 'townhouse', 'duplex', 'triplex', 'studio'])
export const transactionMethod = pgEnum("TransactionMethod", ['bank_transfer', 'cash', 'check', 'credit_card', 'debit_card'])
export const transactionType = pgEnum("TransactionType", ['expense', 'income'])
export const transactionTypes = pgEnum("TransactionTypes", ['expense', 'income'])


export const property = pgTable("Property", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	purpose: propertyPurpose().notNull(),
	type: propertyType().notNull(),
	address: text().notNull(),
	country: text().notNull(),
	currency: char({ length: 3 }).notNull(),
	purchasePrice: numeric({ precision: 12, scale:  2 }).notNull(),
	closingCosts: numeric({ precision: 12, scale:  2 }).notNull(),
	acquisitionDate: date().notNull(),
	currentValue: numeric({ precision: 12, scale:  2 }).notNull(),
	valuationDate: date().notNull(),
	photos: text().array().default([""]).notNull(),
	sold: boolean().default(false).notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Property_userId_fkey"
		}).onDelete("cascade"),
]);

export const propertyInfo = pgTable("PropertyInfo", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyId: uuid().notNull(),
	propertyNumber: text().notNull(),
	bedrooms: smallint().notNull(),
	bathrooms: numeric({ precision: 3, scale:  1 }).notNull(),
	sizeSqm: numeric({ precision: 8, scale:  2 }).notNull(),
	status: propertyStatus().default('available').notNull(),
	furnishing: furnishing().notNull(),
	parking: text(),
	lockerNumbers: text().array().default([""]).notNull(),
	notes: text(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [property.id],
			name: "PropertyInfo_propertyId_fkey"
		}).onDelete("cascade"),
	unique("PropertyInfo_propertyId_propertyNumber_key").on(table.propertyId, table.propertyNumber),
	check("PropertyInfo_bathrooms_check", sql`bathrooms >= (0)::numeric`),
	check("PropertyInfo_bedrooms_check", sql`bedrooms >= 0`),
	check("PropertyInfo_sizeSqm_check", sql`"sizeSqm" >= (0)::numeric`),
]);

export const loan = pgTable("Loan", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyId: uuid().notNull(),
	lender: text().notNull(),
	termMonths: smallint().notNull(),
	monthlyPayment: numeric({ precision: 10, scale:  2 }).notNull(),
	totalMortgageAmount: numeric({ precision: 12, scale:  2 }).notNull(),
	interestRate: numeric({ precision: 5, scale:  2 }).notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [property.id],
			name: "Loan_propertyId_fkey"
		}).onDelete("cascade"),
	check("Loan_interestRate_check", sql`("interestRate" >= (0)::numeric) AND ("interestRate" <= (100)::numeric)`),
	check("Loan_monthlyPayment_check", sql`"monthlyPayment" >= (0)::numeric`),
	check("Loan_termMonths_check", sql`"termMonths" >= 0`),
	check("Loan_totalMortgageAmount_check", sql`"totalMortgageAmount" >= (0)::numeric`),
]);

export const tenant = pgTable("Tenant", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyId: uuid().notNull(),
	name: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 50 }),
	email: varchar({ length: 255 }).notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [property.id],
			name: "Tenant_propertyId_fkey"
		}).onDelete("cascade"),
]);

export const documents = pgTable("Documents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyId: uuid(),
	tenantId: uuid(),
	name: text().notNull(),
	path: text().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [property.id],
			name: "Documents_propertyId_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenant.id],
			name: "Documents_tenantId_fkey"
		}).onDelete("cascade"),
	check("Documents_check", sql`(("propertyId" IS NOT NULL) AND ("tenantId" IS NULL)) OR (("propertyId" IS NULL) AND ("tenantId" IS NOT NULL))`),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean().notNull(),
	image: text(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	twoFactorEnabled: boolean(),
	country: text().notNull(),
	currency: text().notNull(),
	vatProfile: integer().notNull(),
}, (table) => [
	unique("user_email_key").on(table.email),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_fkey"
		}).onDelete("cascade"),
	unique("session_token_key").on(table.token),
]);

export const lease = pgTable("Lease", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyId: uuid().notNull(),
	tenantId: uuid().notNull(),
	start: date().notNull(),
	end: date().notNull(),
	rentAmount: numeric({ precision: 10, scale:  2 }).notNull(),
	currency: char({ length: 3 }).notNull(),
	frequency: frequency().notNull(),
	paymentDay: smallint().notNull(),
	deposit: numeric({ precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [property.id],
			name: "Lease_propertyId_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenant.id],
			name: "Lease_tenantId_fkey"
		}).onDelete("cascade"),
	check("Lease_check", sql`("end" IS NULL) OR ("end" >= start)`),
	check("Lease_paymentDay_check", sql`("paymentDay" >= 1) AND ("paymentDay" <= 31)`),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp({ withTimezone: true, mode: 'string' }),
	refreshTokenExpiresAt: timestamp({ withTimezone: true, mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_fkey"
		}).onDelete("cascade"),
]);

export const transaction = pgTable("Transaction", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyId: uuid().notNull(),
	leaseId: uuid(),
	type: transactionType().notNull(),
	subcategory: text(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	currency: char({ length: 3 }).notNull(),
	taxRate: numeric({ precision: 5, scale:  2 }).notNull(),
	taxAmount: numeric({ precision: 10, scale:  2 }).notNull(),
	fxRateToBase: numeric({ precision: 10, scale:  6 }).notNull(),
	from: text().notNull(),
	to: text().notNull(),
	method: transactionMethod().notNull(),
	date: date().notNull(),
	notes: text(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.leaseId],
			foreignColumns: [lease.id],
			name: "Transaction_leaseId_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [property.id],
			name: "Transaction_propertyId_fkey"
		}).onDelete("cascade"),
	check("Transaction_amount_check", sql`amount >= (0)::numeric`),
	check("Transaction_fxRateToBase_check", sql`"fxRateToBase" > (0)::numeric`),
	check("Transaction_taxAmount_check", sql`"taxAmount" >= (0)::numeric`),
	check("Transaction_taxRate_check", sql`("taxRate" >= (0)::numeric) AND ("taxRate" <= (100)::numeric)`),
]);

export const passkey = pgTable("passkey", {
	id: text().primaryKey().notNull(),
	name: text(),
	publicKey: text().notNull(),
	userId: text().notNull(),
	credentialId: text().notNull(),
	counter: integer().notNull(),
	deviceType: text().notNull(),
	backedUp: boolean().notNull(),
	transports: text(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }),
	aaguid: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "passkey_userId_fkey"
		}).onDelete("cascade"),
]);

export const twoFactor = pgTable("twoFactor", {
	id: text().primaryKey().notNull(),
	secret: text().notNull(),
	backupCodes: text().notNull(),
	userId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "twoFactor_userId_fkey"
		}).onDelete("cascade"),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});
