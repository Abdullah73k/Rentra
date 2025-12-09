import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { pool } from "../configs/pg.config.js";
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
} from "../constants/auth.constants.js";
import { sendEmail } from "./auth.utils.js";
import { createAuthMiddleware } from "better-auth/api";
import { passkey } from "better-auth/plugins/passkey";
import { twoFactor } from "better-auth/plugins";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	appName: "Property Management",
	database: pool,
	trustedOrigins: ["http://localhost:5000", "http://localhost:5173"],
	advanced: {
		database: {
			generateId: () => crypto.randomUUID(),
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // 5 minutes
		},
	},
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async ({ user, url, newEmail }) => {
				await sendEmail({
					to: user.email,
					subject: "Verify your email",
					text: `Click this link to verify your email ${url}`,
				});
			},
		},
		additionalFields: {
			country: {
				type: "string",
				required: true,
				input: true,
			},
			currency: {
				type: "string",
				required: true,
				input: true,
			},
			vatProfile: {
				type: "number",
				required: true,
				input: true,
			},
		},
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url }) => {
				await sendEmail({
					to: user.email,
					subject: "Property Management App account deletion",
					text: `click this link: ${url} to delete your account permanently`,
				});
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}`,
			});
		},
		onPasswordReset: async ({ user }, request) => {
			console.log(`Password for user ${user.email} has been reset.`);
		},
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			// send the email with following properties
			await sendEmail({
				to: user.email,
				subject: "Verify your email",
				text: `Click this link to verify your email ${url}`,
			});
		},
	},
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			mapProfileToUser: () => {
				return {
					country: "",
					currency: "",
					vatProfile: 0
				}
			}
		},
		discord: {
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET,
			mapProfileToUser: () => {
				return {
					country: "",
					currency: "",
					vatProfile: 0
				}
			}
		},
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			mapProfileToUser: () => {
				return {
					country: "",
					currency: "",
					vatProfile: 0
				}
			}
		},
	},
	hooks: {
		// sending email to user after singing up to welcome them
		after: createAuthMiddleware(async (ctx) => {
			// check if the request is for sign-up to ensure the email is only sent for new users

			if (ctx.path.startsWith("/sign-up")) {
				// Retrieve user information from the new session if available;
				// otherwise, use details from the request body as a fallback.
				const user = ctx.context.newSession?.user ?? {
					name: ctx.body.name,
					email: ctx.body.email,
				};
				// Proceed only if user details are available to avoid errors.
				if (user != null) {
					await sendEmail({
						to: user.email,
						subject: `Thanks for signing up`,
						text: `Hello ${user.name} we are pleased to have you on board our app`,
					});
				}
			}
		}),
	},
	plugins: [passkey(), twoFactor() as BetterAuthPlugin],
});
