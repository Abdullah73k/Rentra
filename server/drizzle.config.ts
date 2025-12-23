import { defineConfig } from "drizzle-kit";
import { SUPABASE_URL } from "./src/constants/supabase.constants";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schemas/*",
	out: "./drizzle",
	verbose: true,
	strict: true,
	dbCredentials: {
		url: SUPABASE_URL,
	},
});
