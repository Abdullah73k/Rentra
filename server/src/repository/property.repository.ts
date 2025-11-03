import type {
	Lease,
	Loan,
	Property,
	PropertyInfo,
	Tenant,
} from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const PropertyRepository = {
	async createProperty(property: Property) {
		const { columns, values, queryPlaceholders } =
			generateCreateQueryColsAndValues<Property>(property);

		const query = await insertIntoTable<Property>({
			table: "Property",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createPropertyInfo(propertyInfo: PropertyInfo) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<PropertyInfo>(propertyInfo);

		const query = await insertIntoTable<PropertyInfo>({
			table: "PropertyInfo",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createLoan(loan: Loan) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<Loan>(loan);

		const query = insertIntoTable<Loan>({
			table: "Loan",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createTenant(tenant: Tenant) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<Tenant>(tenant);

		const query = insertIntoTable<Tenant>({
			table: "Tenant",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createLease(lease: Lease) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<Lease>(lease);

		const query = insertIntoTable<Loan>({
			table: "Lease",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createTransaction() {},
	async createDocument() {},
};
