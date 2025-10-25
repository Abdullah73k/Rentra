import { betterAuth } from "better-auth";
import { pool } from "../config/pg.config.js";

export const auth = betterAuth({
	database: pool,
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({user, url, token}, request) => {
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
		sendVerificationEmail: async ({user, url, token}, request) => {
			// send the email with following properties
		}
	}
});
