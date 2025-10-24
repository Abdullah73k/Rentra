import { betterAuth } from "better-auth";
import { pool } from "../config/pg.config.js";


export const auth = betterAuth({
    database: pool,
    emailAndPassword: {
        enabled: true,
    },

});