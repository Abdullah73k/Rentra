import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { property } from "./property.db.js";
import { tenant } from "./tenant.db.js";

export const documents = pgTable(
  "Documents",
  {
    id: uuid("id").primaryKey().defaultRandom(), 

    propertyId: uuid("propertyId").references(() => property.id, {
      onDelete: "cascade",
    }),

    tenantId: uuid("tenantId").references(() => tenant.id, {
      onDelete: "cascade",
    }),

    name: text("name").notNull(),
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