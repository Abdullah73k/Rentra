import type { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import {
	validateUUID,
	validateTransactionDetails,
} from "../utils/validation.utils.js";
import * as API from "../types/api.types.js";
import { TransactionService } from "../services/transaction.services.js";
import { ValidationError } from "../errors/validation.errors.js";

export const postCreateTransaction = async (
	req: Request<{}, {}, { transactionDetails: API.POSTTransaction }, {}>,
	res: Response
) => {
	const { transactionDetails } = req.body;
	const result = validateTransactionDetails(transactionDetails);
	if (!result.success)
		throw new ValidationError("Transaction validation failed", result.errors);
	const zodResult = result.data;

	const response = await TransactionService.create(zodResult);

	return res.status(StatusCodes.CREATED).json({
		error: false,
		message: "Transaction created",
		data: response,
	});
};
export const deleteTransaction = async (
	req: Request<{ transactionId: string }>,
	res: Response
) => {
	const { transactionId } = req.params;
	const result = validateUUID(transactionId);
	if (!result.success) throw new ValidationError("Invalid transaction Id");

	await TransactionService.delete(transactionId);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "successfully deleted transaction",
	});
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

	if (!transactionDataResult.success)
		throw new ValidationError(
			"Transaction validation failed",
			transactionDataResult.errors
		);

	const validatedTransactionData = transactionDataResult.data;

	const response = await TransactionService.update({
		...validatedTransactionData,
		id: transactionId,
	});

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Transaction updated",
		data: response,
	});
};
