import { sql } from "drizzle-orm";
import {
	pgTable,
	uuid,
	text,
	timestamp,
	check,
	pgEnum,
	integer,
} from "drizzle-orm/pg-core";

import { property } from "./property.db.js";
import { tenant } from "./tenant.db.js";
import { user } from "./auth-schema.db.js";

export const documentTypeEnum = pgEnum("documentType", ["photo", "document"]);

export const documents = pgTable(
	"Documents",
	{
		id: uuid("id").primaryKey().notNull(),
		userId: text("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		propertyId: uuid("propertyId").references(() => property.id, {
			onDelete: "cascade",
		}),

		tenantId: uuid("tenantId").references(() => tenant.id, {
			onDelete: "cascade",
		}),

		name: text("name").notNull(),
		type: documentTypeEnum("type").notNull(),
		contentType: text("contentType").notNull(),
		sizeBytes: integer("sizeBytes").notNull(),
		path: text("path").notNull(),

		createdAt: timestamp("createdAt", { withTimezone: true })
			.notNull()
			.defaultNow(),

		updatedAt: timestamp("updatedAt", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		check(
			"Documents_exactly_one_owner_check",
			sql`(${t.propertyId} IS NOT NULL AND ${t.tenantId} IS NULL)
          OR
          (${t.propertyId} IS NULL AND ${t.tenantId} IS NOT NULL)`
		),
	]
);
