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
export type PatchPropertyData = z.input<
	typeof patchPropertyInfoValidationSchema
>;

export type PropertyData = z.input<typeof postPropertyInfoValidationSchema>;
export type PropertyDataZod = z.output<typeof postPropertyInfoValidationSchema>;

// transformed from http req into proper format to be stored in DB (transformed by zod)
export type PropertyZod = PropertyDataZod["property"];
export type PropertyInfoZod = PropertyDataZod["propertyInfo"];
export type LoanZod = PropertyDataZod["loan"];
export type TenantZod = PropertyDataZod["tenant"];
export type LeaseZod = PropertyDataZod["lease"];

