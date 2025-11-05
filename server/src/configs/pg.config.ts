import { Pool } from "pg";
import { config } from "dotenv";
import { SUPABASE_CONNECTION_STRING } from "../constants/supabase.constants.js";

config()

export const pool = new Pool({
	connectionString: SUPABASE_CONNECTION_STRING,
});
