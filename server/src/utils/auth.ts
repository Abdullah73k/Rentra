import { betterAuth } from "better-auth";
import { pool } from "../config/supabase.config.js";

export const auth = betterAuth({
    database: pool,
    emailAndPassword: {
        enabled: true,
    },

});