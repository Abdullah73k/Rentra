import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const TransactionRepository = {
	async createTransaction(transaction: DB.Transaction) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<DB.Transaction>(transaction);

		const query = insertIntoTable<DB.Transaction>({
			table: "Transaction",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
