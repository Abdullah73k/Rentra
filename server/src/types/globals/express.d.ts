// import type { User } from "../../db/schemas/auth-schema.db.ts";
import type { User, Session } from "better-auth";

declare global {
	namespace Express {
		interface Request {
			user?: User;
			session?: Session
		}
	}
}
