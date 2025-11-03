import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const PropertyRepository = {
	async createProperty(property: DB.Property) {
		const { columns, values, queryPlaceholders } =
			generateCreateQueryColsAndValues<DB.Property>(property);

		const query = await insertIntoTable<DB.Property>({
			table: "Property",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createPropertyInfo(propertyInfo: DB.PropertyInfo) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<DB.PropertyInfo>(propertyInfo);

		const query = await insertIntoTable<DB.PropertyInfo>({
			table: "PropertyInfo",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createLoan(loan: DB.Loan) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<DB.Loan>(loan);

		const query = insertIntoTable<DB.Loan>({
			table: "Loan",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createTenant(tenant: DB.Tenant) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<DB.Tenant>(tenant);

		const query = insertIntoTable<DB.Tenant>({
			table: "Tenant",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async createLease(lease: DB.Lease) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<DB.Lease>(lease);

		const query = insertIntoTable<DB.Loan>({
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
