import { defineConfig } from "drizzle-kit";
import { SUPABASE_CONNECTION_STRING, SUPABASE_URL } from "./src/constants/supabase.constants.js";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schemas/*",
	out: "./drizzle",
	verbose: true,
	strict: true,
	dbCredentials: {
		url: SUPABASE_CONNECTION_STRING,
	},
});
