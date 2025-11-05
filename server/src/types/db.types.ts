import type z from "zod";
// import {
// 	documentSchema,
// 	patchPropertyInfoValidationSchema,
// 	patchTransactionValidationSchema,
// 	postDocumentSchema,
// 	postPropertyInfoValidationSchema,
// 	postTransactionValidationSchema,
// } from "../schemas/reusable.schemas.js";
import * as POST from "../schemas/post.schemas.js";
import * as PATCH from "../schemas/patch.schemas.js";

export type TableObjects =
	| Lease
	| Loan
	| PropertyInfo
	| Property
	| Tenant
	| Transaction
	| Document
	| CreateProperty
	| CreateLease 
	| CreateDocument
	| CreateLoan
	| CreatePropertyInfo
	| CreateTenant
	| CreateTransaction;

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
	typeof POST.propertyDataSchema
>;
export type PATCHPropertyData = z.output<
	typeof PATCH.propertyDataSchema
>;

// transformed from http req into proper format to be stored in DB (transformed by zod)
export type Property = NonNullable<PATCHPropertyData["property"]>;
export type PropertyInfo = NonNullable<PATCHPropertyData["propertyInfo"]>;
export type Loan = NonNullable<PATCHPropertyData["loan"]>;
export type Tenant = NonNullable<PATCHPropertyData["tenant"]>;
export type Lease = NonNullable<PATCHPropertyData["lease"]>;
export type Transaction = z.output<typeof PATCH.transactionSchema>;
export type Document = z.output<typeof PATCH.documentSchema>;

export type CreateProperty = POSTPropertyData["property"];
export type CreatePropertyInfo = POSTPropertyData["propertyInfo"];
export type CreateLoan = NonNullable<POSTPropertyData["loan"]>;
export type CreateTenant = NonNullable<POSTPropertyData["tenant"]>;
export type CreateLease = NonNullable<POSTPropertyData["lease"]>;
export type CreateTransaction = z.output<
	typeof POST.transactionSchema
>;
export type CreateDocument = z.output<typeof POST.documentSchema>;
