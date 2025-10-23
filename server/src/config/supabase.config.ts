import { config } from "dotenv";

import {Pool} from "pg"

config({ path: "./src/.env" });

export const pool = new Pool({
	connectionString: process.env.SUPABASE_CONNECTION_STRING
})
