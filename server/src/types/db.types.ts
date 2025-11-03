import type z from "zod";
import {
	patchPropertyInfoValidationSchema,
	postPropertyInfoValidationSchema,
} from "../schemas/propertyInfo.schemas.js";

export type TableObjects = Lease | Loan | PropertyInfo | Property | Tenant;
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
export type Property = NonNullable<PATCHPropertyData["property"]>;
export type PropertyInfo = NonNullable<PATCHPropertyData["propertyInfo"]>;
export type Loan = NonNullable<PATCHPropertyData["loan"]>;
export type Tenant = NonNullable<PATCHPropertyData["tenant"]>;
export type Lease = NonNullable<PATCHPropertyData["lease"]>;
