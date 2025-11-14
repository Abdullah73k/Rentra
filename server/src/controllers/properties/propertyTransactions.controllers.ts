import type { Request, Response } from "express";
import { StatusCodes } from "../../constants/statusCodes.constants.js";
import {
	validateUUID,
	validateTransactionDetails,
} from "../../utils/validation.utils.js";
import * as API from "../../types/api.types.js";
import { TransactionService } from "../../services/transaction.services.js";
import { ValidationError } from "../../errors/validation.errors.js";

export const postCreateTransaction = async (
	req: Request<{}, {}, { transactionDetails: API.POSTTransaction }, {}>,
	res: Response
) => {
	const { transactionDetails } = req.body;
	// 1. Validate tx data
	const result = validateTransactionDetails(transactionDetails);
	// 2. If data invalid return 400
	if (!result.success)
		throw new ValidationError("Transaction validation failed", result.errors);
	// 3. Query DB to insert data
	const query = true;
	// Unique restriction will be set on a database lvl amount, date, vendor, and leaseID
	// 4. If DB unique constrain error occurs return 409, duplicate record
	if (query) {
		return res.status(StatusCodes.CONFLICT).json({
			error: true,
			message:
				"Duplicate transaction detected (same amount, date, vendor, and lease)",
		});
	}
	// 5. If any foreign keys not found such as lease or propertyID then DB will return error and endpoint will return 404
	if (query) {
		return res.status(StatusCodes.NOT_FOUND).json({
			error: true,
			message: "Related record not found (property/unit/lease)",
		});
	}

	// 6. Otherwise data was successfully inserted, return 201
	return res.status(StatusCodes.CREATED).json({
		error: false,
		message: "Transaction created",
		data: {}, // transaction data that was inserted will be returned and sent back to frontend.
	});
};
export const deleteTransaction = async (
	req: Request<{ transactionId: string }>,
	res: Response
) => {
	const { transactionId } = req.params;
	const result = validateUUID(transactionId);
	// checking if transactionId is a valid UUID
	if (!result.success) throw new ValidationError("Invalid transaction Id");

	// delete transaction using transaction Id
	await TransactionService.delete(transactionId);

	// check if rows were affected and respond accordingly

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "successfully deleted transaction",
	});

	// TODO: Will handle later with error middleware
	// return res.status(StatusCodes.NOT_FOUND).json({
	// 	error: true,
	// 	message: "Transaction doesn't exist",
	// });
};
export const patchTransaction = async (
	req: Request<{ transactionId: string }, {}, API.POSTTransaction>,
	res: Response
) => {
	const transactionData = req.body;
	const { transactionId } = req.params;

	const combinedTransactionData: API.PATCHTransaction = {
		id: transactionId,
		...transactionData,
	};

	const transactionDataResult =
		validateTransactionDetails<API.PATCHTransaction>(
			combinedTransactionData,
			true
		);

	// checking if transaction data is valid
	if (!transactionDataResult.success)
		throw new ValidationError(
			"Transaction validation failed",
			transactionDataResult.errors
		);

	const validatedTransactionData = transactionDataResult.data;

	// use validated data to query db

	res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Transaction updated",
		data: validatedTransactionData,
	});
};
