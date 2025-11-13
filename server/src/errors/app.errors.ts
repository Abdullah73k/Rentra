import type { StatusCodes } from "../constants/statusCodes.constants.js";

export abstract class AppError extends Error {
    abstract statusCode: StatusCodes
	public constructor(message: string) {
		super(message);

	}
}
