import dotenv from "dotenv"

dotenv.config();

export const SUPABASE_URL = process.env.SUPABASE_URL ?? ""
export const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY ?? ""