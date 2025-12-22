export const LEASE_COLUMNS = [
	"start",
	"end",
	"rentAmount",
	"currency",
	"frequency",
	"paymentDay",
	"deposit",
	"id",
	"propertyId",
	"tenantId",
] as const;

export const LOAN_COLUMNS = [
	"lender",
	"termMonths",
	"monthlyPayment",
	"totalMortgageAmount",
	"interestRate",
	"id",
	"propertyId",
] as const;

export const PROPERTY_INFO_COLUMNS = [
	"propertyNumber",
	"bedrooms",
	"bathrooms",
	"sizeSqm",
	"status",
	"furnished",
	"lockerNumbers",
	"id",
	"propertyId",
	"parking",
	"notes",
] as const;

export const PROPERTY_COLUMNS = [
	"userId",
	"purpose",
	"type",
	"address",
	"country",
	"currency",
	"purchasePrice",
	"closingCosts",
	"acquisitionDate",
	"currentValue",
	"photos",
	"sold",
	"id",
] as const;

export const TENANT_COLUMNS = [
	"name",
	"email",
	"id",
	"propertyId",
	"phone",
] as const;

export const DOCUMENT_COLUMNS = [
	"propertyId",
	"name",
	"path",
	"id",
	"tenantId",
] as const;

export const TRANSACTION_COLUMNS = [
	"propertyId",
	"type",
	"amount",
	"currency",
	"taxRate",
	"taxAmount",
	"fxRateToBase",
	"from",
	"to",
	"method",
	"date",
	"id",
	"leaseId",
	"subcategory",
	"notes",
] as const;
