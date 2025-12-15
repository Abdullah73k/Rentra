import { API_URL } from "@/constants/api.constants";
import { inferAdditionalFields, passkeyClient, twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
	baseURL: `${API_URL}/api/auth`,
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
	}), passkeyClient()]
})