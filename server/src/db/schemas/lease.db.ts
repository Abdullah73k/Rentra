import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  date,
  numeric,
  char,
  smallint,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { property } from "./property.db.js"; 
import { tenant } from "./tenant.db.js";   

export const frequencyEnum = pgEnum("Frequency", [
  "weekly",
  "bi-weekly",
  "monthly",
  "bi-monthly",
  "quarterly",
  "annually",
  "bi-annually",
]);

export const lease = pgTable(
  "Lease",
  {
    id: uuid("id").primaryKey().defaultRandom(), 

    propertyId: uuid("propertyId")
      .notNull()
      .references(() => property.id, { onDelete: "cascade" }),

    tenantId: uuid("tenantId")
      .notNull()
      .references(() => tenant.id, { onDelete: "cascade" }),

    start: date("start").notNull(),
    end: date("end").notNull(),

    rentAmount: numeric("rentAmount", { precision: 10, scale: 2 }).notNull(),
    currency: char("currency", { length: 3 }).notNull(),

    frequency: frequencyEnum("frequency").notNull(), 

    paymentDay: smallint("paymentDay").notNull(),
    deposit: numeric("deposit", { precision: 10, scale: 2 }).notNull(),

    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    check(
      "Lease_paymentDay_check",
      sql`${t.paymentDay} BETWEEN 1 AND 31`
    ),

    check(
      "Lease_end_gte_start_check",
      sql`${t.end} IS NULL OR ${t.end} >= ${t.start}`
    ),
  ]
);