import type { StatusCodes } from "../constants/statusCodes.constants.js";
import { AppError } from "./app.errors.js";

export class DBError extends AppError {
	public readonly statusCode: StatusCodes;
	public readonly cause: unknown;

	constructor(statusCode: StatusCodes, message: string, cause: unknown) {
		super(message);
		this.statusCode = statusCode;
		this.cause = cause;
		this.name = "DBError";
	}
}
