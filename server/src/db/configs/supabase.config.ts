import { createClient } from "@supabase/supabase-js";
import {
	SUPABASE_SERVICE_ROLE_KEY,
	SUPABASE_URL,
} from "../../constants/supabase.constants.js";
console.log("Supabase Key Check:", process.env ? "Defined" : "MISSING");

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
