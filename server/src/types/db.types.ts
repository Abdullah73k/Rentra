import type z from "zod";
import {
	documentSchema,
	patchPropertyInfoValidationSchema,
	patchTransactionValidationSchema,
	postPropertyInfoValidationSchema,
} from "../schemas/propertyInfo.schemas.js";

export type TableObjects =
	| Lease
	| Loan
	| PropertyInfo
	| Property
	| Tenant
	| Transaction
	| Document;

export type DatabaseTables =
	| "Property"
	| "PropertyInfo"
	| "Loan"
	| "Tenant"
	| "Documents"
	| "Transaction"
	| "Lease";

// export type Property = z.output<typeof propertySchema>;

export type POSTPropertyData = z.output<
	typeof postPropertyInfoValidationSchema
>;
export type PATCHPropertyData = z.output<
	typeof patchPropertyInfoValidationSchema
>;

// transformed from http req into proper format to be stored in DB (transformed by zod)
export type Property = POSTPropertyData["property"];
export type PropertyInfo = POSTPropertyData["propertyInfo"];
export type Loan = NonNullable<POSTPropertyData["loan"]>;
export type Tenant = NonNullable<POSTPropertyData["tenant"]>;
export type Lease = NonNullable<POSTPropertyData["lease"]>;
export type Transaction = z.output<typeof patchTransactionValidationSchema>;
export type Document = z.output<typeof documentSchema>;
