import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema.db.js";

export const aiThreads = pgTable("AiThreads", {
	id: uuid("id").primaryKey().notNull(),
	userId: text("userId")
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: "cascade" }),
	assistantId: text("assistantId").notNull(),
	threadId: text("threadId").notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true })
		.notNull()
		.defaultNow(),
});
