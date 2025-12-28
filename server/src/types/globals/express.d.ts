// import type { User } from "../../db/schemas/auth-schema.db.ts";
import type { User } from "better-auth";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
