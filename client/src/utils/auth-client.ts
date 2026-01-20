import { API_URL } from "@/constants/api.constants";
import {
	inferAdditionalFields,
	twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";

export const authClient = createAuthClient({
	baseURL: `${API_URL}/api/auth`,
	plugins: [
		inferAdditionalFields({
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
			},
		}),
		twoFactorClient({
			onTwoFactorRedirect: () => {
				window.location.href = "/auth/2fa";
			},
		}),
		passkeyClient(),
	],
});
