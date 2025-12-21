import { sql } from "drizzle-orm";
import {
	pgTable,
	uuid,
	text,
	boolean,
	numeric,
	date,
	timestamp,
	char,
	pgEnum,
} from "drizzle-orm/pg-core";
import { user } from "./stub.db.js";

/**
 * SQL:
 * CREATE TYPE PropertyPurpose AS ENUM ('personal','investment');
 */
export const propertyPurposeEnum = pgEnum("PropertyPurpose", [
	"personal",
	"investment",
]);

/**
 * SQL:
 * CREATE TYPE PropertyType AS ENUM (...);
 */
export const propertyTypeEnum = pgEnum("PropertyType", [
	"house",
	"apartment",
	"villa",
	"penthouse",
	"townhouse",
	"duplex",
	"triplex",
	"studio",
]);

export const property = pgTable("Property", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),

	purpose: propertyPurposeEnum("purpose").notNull(),
	type: propertyTypeEnum("type").notNull(),
	address: text("address").notNull(),
	country: text("country").notNull(),
	currency: char("currency", { length: 3 }).notNull(),

	purchasePrice: numeric("purchasePrice", { precision: 12, scale: 2 }),
	closingCosts: numeric("closingCosts", { precision: 12, scale: 2 }),
	acquisitionDate: date("acquisitionDate", { mode: "string" }),

	currentValue: numeric("currentValue", { precision: 12, scale: 2 }),
	valuationDate: date("valuationDate", { mode: "string" }),

	photos: text("photos")
		.array()
		.notNull()
		.default(sql`'{}'::text[]`),

	sold: boolean("sold").notNull().default(false),

	createdAt: timestamp("createdAt", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updatedAt", { withTimezone: true })
		.notNull()
		.defaultNow(),
});
