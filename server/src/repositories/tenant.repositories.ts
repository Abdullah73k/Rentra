import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const TenantRepository = {
	async createTenant(tenant: DB.CreateTenant) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(tenant);

		const query = insertIntoTable<DB.Tenant>({
			table: "Tenant",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
