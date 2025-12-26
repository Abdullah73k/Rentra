import type { StatusCodes } from "../constants/status-codes.constants.js";

export abstract class AppError extends Error {
	abstract statusCode: StatusCodes;
	public constructor(message: string) {
		super(message);
		this.name = "AppError";
	}
}
