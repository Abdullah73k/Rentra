import { betterAuth } from "better-auth";
import { pool } from "../config/pg.config.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../constants/auth.constants.js";
import { sendEmail } from "./auth.utils.js";

export const auth = betterAuth({
	database: pool,
	advanced: {
		database: {
			generateId: () => crypto.randomUUID()
		}
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5 // 5 minutes
		}
	},
	user: {
		additionalFields: {
			country: {
				type: "string",
				required: true,
				input: true
			},
			currency: {
				type: "string",
				required: true,
				input: true
			},
			vatProfile: {
				type: "number",
				required: true,
				input: true
			}
		}
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			//   await sendEmail({
			//     to: user.email,
			//     subject: "Reset your password",
			//     text: `Click the link to reset your password: ${url}`,
			//   });
			// logic for sending email
		},
		onPasswordReset: async ({ user }, request) => {
			// your logic here
			console.log(`Password for user ${user.email} has been reset.`);
		},
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			// send the email with following properties
		}
	},
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		},
		discord: {
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET
		},
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		}
	}
});
