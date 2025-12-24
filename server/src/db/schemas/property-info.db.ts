import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  text,
  smallint,
  numeric,
  timestamp,
  unique,
  check,
} from "drizzle-orm/pg-core";
import { property } from "./property.db.js";

export const propertyStatusEnum = pgEnum("PropertyStatus", [
  "available",
  "rented",
  "maintenance",
  "off_market",
  "reserved",
]);

export const furnishingEnum = pgEnum("Furnishing", [
  "furnished",
  "semi-furnished",
  "unfurnished",
]);

export const propertyInfo = pgTable(
  "PropertyInfo",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    propertyId: uuid("propertyId")
      .notNull()
      .references(() => property.id, { onDelete: "cascade" }),

    propertyNumber: text("propertyNumber").notNull(),

    bedrooms: smallint("bedrooms").notNull(),
    bathrooms: numeric("bathrooms", { precision: 3, scale: 1 }).notNull(),
    sizeSqm: numeric("sizeSqm", { precision: 8, scale: 2 }).notNull(),

    status: propertyStatusEnum("status").notNull().default("available"),
    furnishing: furnishingEnum("furnishing").notNull(),

    parking: text("parking"),

    lockerNumbers: text("lockerNumbers")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),

    notes: text("notes"),

    createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // UNIQUE ("propertyId","propertyNumber")
    unique().on(t.propertyId, t.propertyNumber),

    // CHECK ("bedrooms" >= 0)
    check("PropertyInfo_bedrooms_check", sql`${t.bedrooms} >= 0`),

    // CHECK ("bathrooms" >= 0)
    check("PropertyInfo_bathrooms_check", sql`${t.bathrooms} >= 0`),

    // CHECK ("sizeSqm" >= 0)
    check("PropertyInfo_sizeSqm_check", sql`${t.sizeSqm} >= 0`),
  ]
);