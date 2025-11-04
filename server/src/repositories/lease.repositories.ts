import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const LeaseRepository = {
	async createLease(lease: DB.CreateLease) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(lease);

		const query = insertIntoTable<DB.Lease>({
			table: "Lease",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
