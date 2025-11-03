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


// Transactions
export type POSTTransaction = z.input<
	typeof postTransactionValidationSchema
>;
export type PATCHTransaction = z.input<typeof patchTransactionValidationSchema>;


// Property
export type PATCHPropertyData = z.input<
	typeof patchPropertyInfoValidationSchema
>;
export type POSTPropertyData = z.input<typeof postPropertyInfoValidationSchema>;
