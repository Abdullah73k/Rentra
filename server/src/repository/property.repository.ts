import type {
	LeaseZod,
	LoanZod,
	PropertyInfoZod,
	PropertyZod,
	TenantZod,
} from "../types/index.types.js";

export const PropertyRepository = {
	async createProperty(property: PropertyZod) {},
	async createPropertyInfo(propertyInfo: PropertyInfoZod) {},
	async createLoan(loan: LoanZod) {},
	async createTenant(tenant: TenantZod) {},
	async createLease(lease: LeaseZod) {},
};
