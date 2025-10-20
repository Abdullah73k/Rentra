import type z from "zod";
import type {
	patchPropertyInfoValidationSchema,
	postPropertyInfoValidationSchema,
	postTransactionValidationSchema,
	patchTransactionValidationSchema
} from "../schemas/propertyInfo.schemas.js";

export type PostCreateTransaction = z.input<
	typeof postTransactionValidationSchema
>;
export type PatchTransaction = z.input<typeof patchTransactionValidationSchema>

export type PropertyInfo = z.input<typeof postPropertyInfoValidationSchema>;
export type PatchPropertyInfo = z.input<
	typeof patchPropertyInfoValidationSchema
>;