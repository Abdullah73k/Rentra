import type { ErrorRequestHandler } from "express";
import { ValidationError } from "../errors/validation.errors.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";

export const errorHandler: ErrorRequestHandler = (
	error: Error,
	req,
	res,
	next
) => {
	if (error instanceof ValidationError) {
		return res.status(error.statusCode).json({
			error: error.name,
			message: error.message,
			errors: error?.errors,
		});
	}

	if (error instanceof DBError) {
		console.error("Unexpected DB Error", {
			cause: error.cause,
		});
		return res.status(error.statusCode).json({
			error: error.name,
			message: error.message,
		});
	}

	console.error("Unknown error", error);
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: "Unexpected error, please try again later or contact our team",
	});
};
