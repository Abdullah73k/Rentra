import { Pool } from "pg";
import { SUPABASE_CONNECTION_STRING } from "../../constants/supabase.constants.js";

export const pool = new Pool({
	connectionString: SUPABASE_CONNECTION_STRING,
});
