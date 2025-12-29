import * as POST from "../schemas/post.schemas.js";
import * as PATCH from "../schemas/patch.schemas.js";
import { z } from "zod";
import * as API from "../types/api.types.js";

export function validateUUID(userId: string | undefined | null) {
	const schema = z.uuid();
	const result = schema.safeParse(userId);
	return result;
}
export function validatePropertyData<
	T extends API.POSTPropertyData | API.PATCHPropertyData
>(data: T, patch: boolean = false) {
	const schema = patch ? PATCH.propertyDataSchema : POST.propertyDataSchema;
	const result = schema.safeParse(data);

	if (!result.success) {
		const formatted = result.error.issues.map((issue) => ({
			field: issue.path.join("."), // e.g. "property.userId"
			message: issue.message, // e.g. "Invalid UUID"
		}));
		const errorObj = { success: false as const, errors: formatted };
		return errorObj;
	}
	const validatedData = {
		success: true as const,
		data: result.data as T,
	};
	return validatedData;
}

export function validateTransactionDetails<
	T extends API.POSTTransaction | API.PATCHTransaction
>(transaction: T, patch: boolean = false) {
	const schema = patch ? PATCH.transactionSchema : POST.transactionSchema;

	const result = schema.safeParse(transaction);

	if (!result.success) {
		const formatted = result.error.issues.map((issue) => ({
			field: issue.path.join("."), // e.g. "property.userId"
			message: issue.message, // e.g. "Invalid UUID"
		}));

		const errorObj = { success: false as const, errors: formatted };

		return errorObj;
	}

	const validatedData = { success: true as const, data: result.data };
	return validatedData;
}
