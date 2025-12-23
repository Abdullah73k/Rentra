import { sql } from "drizzle-orm";
import {
	pgEnum,
	pgTable,
	uuid,
	text,
	char,
	numeric,
	date,
	timestamp,
	check,
} from "drizzle-orm/pg-core";

import { property } from "./property.db.js";
import { lease } from "./lease.db.js";

export const transactionTypeEnum = pgEnum("TransactionType", [
	"expense",
	"income",
]);

export const transactionMethodEnum = pgEnum("TransactionMethod", [
	"bank_transfer",
	"cash",
	"check",
	"credit_card",
	"debit_card",
]);

export const transaction = pgTable(
	"Transaction",
	{
		id: uuid("id").primaryKey().defaultRandom(),

		propertyId: uuid("propertyId")
			.notNull()
			.references(() => property.id, { onDelete: "cascade" }),

		leaseId: uuid("leaseId").references(() => lease.id, {
			onDelete: "cascade",
		}),

		type: transactionTypeEnum("type").notNull(),
		subcategory: text("subcategory"),

		amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
		currency: char("currency", { length: 3 }).notNull(),

		taxRate: numeric("taxRate", { precision: 5, scale: 2 }).notNull(),
		taxAmount: numeric("taxAmount", { precision: 10, scale: 2 }).notNull(),

		fxRateToBase: numeric("fxRateToBase", {
			precision: 10,
			scale: 6,
		}).notNull(),

		from: text("from").notNull(),
		to: text("to").notNull(),

		method: transactionMethodEnum("method").notNull(),

		date: date("date", { mode: "string" }).notNull(),
		notes: text("notes"),

		createdAt: timestamp("createdAt", { withTimezone: true })
			.notNull()
			.defaultNow(),

		updatedAt: timestamp("updatedAt", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		check("Transaction_amount_check", sql`${t.amount} >= 0`),

		check(
			"Transaction_taxRate_check",
			sql`${t.taxRate} >= 0 AND ${t.taxRate} <= 100`
		),

		check("Transaction_taxAmount_check", sql`${t.taxAmount} >= 0`),

		check("Transaction_fxRateToBase_check", sql`${t.fxRateToBase} > 0`),
	]
);
