import * as DB from "../types/db.types.js";
import {
	deleteRowFromTableWithId,
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const TransactionRepository = {
	async createTransaction(transaction: DB.CreateTransaction) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(transaction);

		const query = insertIntoTable<DB.Transaction>({
			table: "Transaction",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async delete(transactionId: string) {
		await deleteRowFromTableWithId({
			table: "Transaction",
			idName: "id",
			id: transactionId,
		});
	},
};
