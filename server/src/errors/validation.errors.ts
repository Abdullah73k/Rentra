import { StatusCodes } from "../constants/status-codes.constants.js";
import { AppError } from "./app.errors.js";

type ValidationIssue = { field: string; message: string };

export class ValidationError extends AppError {
	public readonly statusCode = StatusCodes.BAD_REQUEST;

	constructor(message: string, public readonly errors?: ValidationIssue[]) {
		super(message);
		this.name = "ValidationError";
	}
}
