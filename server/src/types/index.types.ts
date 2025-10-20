import type z from "zod";
import type {
	patchPropertyInfoValidationSchema,
	postPropertyInfoValidationSchema,
	postTransactionValidationSchema,
} from "../schemas/propertyInfo.schemas.js";

export type PostCreateTransaction = z.input<
	typeof postTransactionValidationSchema
>;

export type PropertyInfo = z.infer<typeof postPropertyInfoValidationSchema>;
export type PatchPropertyInfo = z.infer<
	typeof patchPropertyInfoValidationSchema
>;
