import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { property } from "./property.db.js";

export const tenant = pgTable("Tenant", {
  id: uuid("id").primaryKey().defaultRandom(),

  propertyId: uuid("propertyId")
    .notNull()
    .references(() => property.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }).notNull(),

  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
});