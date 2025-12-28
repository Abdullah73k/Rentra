import type { ErrorRequestHandler } from "express";
import { ValidationError } from "../errors/validation.errors.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { MulterError } from "multer";

export const errorHandler: ErrorRequestHandler = (
	error: Error,
	req,
	res,
	next
) => {
	console.error("Error", error);

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

	if (error instanceof MulterError) {
		switch (error.code) {
			case "LIMIT_FILE_SIZE":
				return res.status(StatusCodes.BAD_REQUEST).json({
					error: error.name,
					message: "File size exceeds limit",
				});
			case "LIMIT_FILE_COUNT":
				return res.status(StatusCodes.BAD_REQUEST).json({
					error: error.name,
					message: "File count exceeds limit",
				});
			case "LIMIT_UNEXPECTED_FILE":
				return res.status(StatusCodes.BAD_REQUEST).json({
					error: error.name,
					message: `Unexpected field ${error.field}, please check your input`,
				});
			case "MISSING_FIELD_NAME":
				return res.status(StatusCodes.BAD_REQUEST).json({
					error: error.name,
					message: "Field name missing, please ensure the file is uploaded with the correct field key",
				});
			default:
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: error.name,
					message: error.message || "File upload failed. Please try again or contact our team.",
					code: error.code,
				});
		}
	}

	console.error("Unknown error", error);
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: "Unexpected error, please try again later or contact our team",
	});
};
