import { drizzle } from "drizzle-orm/node-postgres";
import { SUPABASE_CONNECTION_STRING } from "../../constants/supabase.constants.js";
import * as schema from "../schemas/index.schema.js";

export const pool = drizzle(SUPABASE_CONNECTION_STRING, { schema });
