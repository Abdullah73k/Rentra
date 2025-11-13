import type { StatusCodes } from "../constants/statusCodes.constants.js";
import { AppError } from "./app.errors.js";

export class DBError extends AppError {
	public readonly statusCode: StatusCodes;

	constructor(statusCode: StatusCodes, message: string) {
		super(message);
		this.statusCode = statusCode;
	}
}
