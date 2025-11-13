import { StatusCodes } from "../constants/statusCodes.constants.js";
import { AppError } from "./app.errors.js";

type ValidationIssue = { field: string; message: string };

export class ValidationError extends AppError {
	public readonly statusCode = StatusCodes.BAD_REQUEST;
	public readonly errors: ValidationIssue[];

	constructor(message: string, errors: ValidationIssue[]) {
		super(message);
		this.errors = errors;
	}
}
