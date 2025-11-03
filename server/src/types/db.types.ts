import type z from "zod";
import {
	patchPropertyInfoValidationSchema,
	postPropertyInfoValidationSchema,
	propertySchema,
} from "../schemas/propertyInfo.schemas.js";

export type PropertyData = z.output<typeof postPropertyInfoValidationSchema>;
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
export type PatchPropertyData = z.output<
	typeof patchPropertyInfoValidationSchema
>;

// transformed from http req into proper format to be stored in DB (transformed by zod)
export type Property = PropertyData["property"];
export type PropertyInfo = PropertyData["propertyInfo"];
export type Loan = NonNullable<PropertyData["loan"]>;
export type Tenant = NonNullable<PropertyData["tenant"]>;
export type Lease = NonNullable<PropertyData["lease"]>;
