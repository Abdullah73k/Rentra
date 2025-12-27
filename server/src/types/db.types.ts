import type z from "zod";
import * as POST from "../schemas/post.schemas.js";
import * as PATCH from "../schemas/patch.schemas.js";
import {
	DOCUMENT_COLUMNS,
	LEASE_COLUMNS,
	LOAN_COLUMNS,
	PROPERTY_COLUMNS,
	PROPERTY_INFO_COLUMNS,
	TENANT_COLUMNS,
	TRANSACTION_COLUMNS,
} from "../constants/db-table-columns.constants.js";
import type { PATCHPropertyData, POSTPropertyData } from "./api.types.js";

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

export const DatabaseTables = [
	"Property",
	"PropertyInfo",
	"Loan",
	"Tenant",
	"Documents",
	"Transaction",
	"Lease",
] as const;

export type ColumnValidation =
	| typeof TRANSACTION_COLUMNS
	| typeof LEASE_COLUMNS
	| typeof DOCUMENT_COLUMNS
	| typeof LOAN_COLUMNS
	| typeof PROPERTY_COLUMNS
	| typeof PROPERTY_INFO_COLUMNS
	| typeof TENANT_COLUMNS;

export type DatabaseTables = (typeof DatabaseTables)[number];

export const Ids = [
	"userId",
	"propertyId",
	"tenantId",
	"leaseId",
	"id",
	"transactionId",
] as const;

export type Ids = (typeof Ids)[number];

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
export type CreateTransaction = z.output<typeof POST.transactionSchema>;
export type CreateDocument = z.output<typeof POST.documentSchema> & {
	id: string;
};
