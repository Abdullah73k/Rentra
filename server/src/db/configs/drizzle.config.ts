import { drizzle } from "drizzle-orm/node-postgres";
import { SUPABASE_CONNECTION_STRING } from "../../constants/supabase.constants.js";

export const pool = drizzle(SUPABASE_CONNECTION_STRING);
