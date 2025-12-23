import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  smallint,
  numeric,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { property } from "./property.db.js";

export const loan = pgTable(
  "Loan",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    propertyId: uuid("propertyId")
      .notNull()
      .references(() => property.id, { onDelete: "cascade" }),

    lender: text("lender").notNull(),

    termMonths: smallint("termMonths").notNull(),

    monthlyPayment: numeric("monthlyPayment", { precision: 10, scale: 2 }).notNull(),

    totalMortgageAmount: numeric("totalMortgageAmount", { precision: 12, scale: 2 }).notNull(),

    // store as percent (e.g., 5.5 for 5.5%)
    interestRate: numeric("interestRate", { precision: 5, scale: 2 }).notNull(),

    createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // CHECK ("termMonths" >= 0)
    check("Loan_termMonths_check", sql`${t.termMonths} >= 0`),

    // CHECK ("monthlyPayment" >= 0)
    check("Loan_monthlyPayment_check", sql`${t.monthlyPayment} >= 0`),

    // CHECK ("totalMortgageAmount" >= 0)
    check(
      "Loan_totalMortgageAmount_check",
      sql`${t.totalMortgageAmount} >= 0`
    ),

    // CHECK ("interestRate" >= 0 AND "interestRate" <= 100)
    check(
      "Loan_interestRate_check",
      sql`${t.interestRate} >= 0 AND ${t.interestRate} <= 100`
    ),
  ]
);