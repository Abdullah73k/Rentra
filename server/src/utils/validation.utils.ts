import {
	postPropertyInfoValidationSchema,
	patchPropertyInfoValidationSchema,
	postTransactionValidationSchema,
	patchTransactionValidationSchema,
} from "../schemas/propertyInfo.schemas.js";
import { z } from "zod";
import type {
	PatchPropertyInfo,
	PostCreateTransaction,
	PropertyInfo,
	PatchTransaction,
} from "../types/index.types.js";

export function validateUUID(userId: string) {
	const schema = z.uuid();
	const result = schema.safeParse(userId);
	return result;
}
export function validatePropertyInfo<
	T extends PropertyInfo | PatchPropertyInfo
>(data: T, patch: boolean = false) {
	const schema = patch
		? patchPropertyInfoValidationSchema
		: postPropertyInfoValidationSchema;
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
	T extends PostCreateTransaction | PatchTransaction
>(transaction: T, patch: boolean = false) {
	const schema = patch
		? patchTransactionValidationSchema
		: postTransactionValidationSchema;

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

export function validateIncomingData() {}

export function pruneUndefined<T>(obj: T): Partial<T> {
	// If obj is null, undefined, or not an object return as is
	if (obj == null || typeof obj !== "object") return obj as any;

	// If obj is an array, apply pruneUndefined() to each element
	if (Array.isArray(obj)) {
		return obj.map(pruneUndefined) as any;
	}

	return Object.fromEntries(
		Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) => {
			// If the value is undefined, drop this key by returning []
			if (value === undefined) return [];

			// If the value is another object, recursively clean it.
			const cleaned =
				typeof value === "object" && value !== null
					? pruneUndefined(value)
					: value;
			return [[key, cleaned]];
		})
	) as Partial<T>;
}
