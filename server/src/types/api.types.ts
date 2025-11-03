import type z from "zod";
import type {
	patchPropertyInfoValidationSchema,
	postPropertyInfoValidationSchema,
	postTransactionValidationSchema,
	patchTransactionValidationSchema,
} from "../schemas/propertyInfo.schemas.js";

/**
 * This file will contain all types for the property API.
 * Types are made for data being send over HTTP through REST. 
 */

export type PostCreateTransaction = z.input<
	typeof postTransactionValidationSchema
>;
export type APIPatchTransaction = z.input<typeof patchTransactionValidationSchema>;
export type PATCHPropertyData = z.input<
	typeof patchPropertyInfoValidationSchema
>;

export type POSTPropertyData = z.input<typeof postPropertyInfoValidationSchema>;
