/**
 * SQL:
 * CREATE TABLE user (
 *   id TEXT PRIMARY KEY,
 * );
 * 
 * This mimics user table which is handled by better auth. \
 * We only do this to be able to ref user id in property table. \
 * 
 */

import { pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
});
