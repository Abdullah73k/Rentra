import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const LeaseRepository = {
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
};
