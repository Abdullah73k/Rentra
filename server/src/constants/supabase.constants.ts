import { config } from "dotenv";

config()

export const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
export const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY ?? "";
export const SUPABASE_CONNECTION_STRING =
	process.env.SUPABASE_CONNECTION_STRING ?? "";
