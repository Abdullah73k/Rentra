import { inferAdditionalFields, twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
	baseURL: "http://localhost:5000/api/auth",
	plugins: [inferAdditionalFields({
		user: {
			country: {
				type: "string",
			},
			currency: {
				type: "string",
			},
			vatProfile: {
				type: "number",
			},
		}
	}), twoFactorClient({
		onTwoFactorRedirect: () => {
			window.location.href = "/auth/2fa"
		}
	})]
})