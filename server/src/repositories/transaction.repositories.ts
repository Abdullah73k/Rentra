import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbDeleteMessage,
	failedDbInsertMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	deleteRowFromTableWithId,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const TransactionRepository = {
	async createTransaction(transaction: DB.CreateTransaction) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(transaction);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Transaction>({
					table: "Transaction",
					columns,
					queryPlaceholders,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Transaction")
		);

		return query;
	},
	async delete(transactionId: string) {
		await executeDataBaseOperation(
			() =>
				deleteRowFromTableWithId({
					table: "Transaction",
					idName: "id",
					id: transactionId,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Transaction")
		);
	},
};
