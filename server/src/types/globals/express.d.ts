import type { User } from "../../db/schemas/auth-schema.db.js";
import type { Session } from "better-auth";

declare global {
	namespace Express {
		interface Request {
			user?: User;
			session?: Session;
		}
	}
}
