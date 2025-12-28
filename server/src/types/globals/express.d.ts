import type { User } from "../../db/schemas/auth-schema.db.ts";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
