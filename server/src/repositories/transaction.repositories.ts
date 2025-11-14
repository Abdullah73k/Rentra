import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbDeleteMessage,
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	buildUpdateSet,
	deleteRowFromTableWithId,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	updateRowFromTableWithId,
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
	async getTransaction(propertyId: string) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Transaction>({
					table: "Transaction",
					id: propertyId,
					idName: "propertyId",
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Transaction")
		);

		return query;
	},
	async updateTransaction(transaction: DB.Transaction) {
		const dbFn = async (transaction: DB.Transaction) => {
			const { setString, values } = buildUpdateSet(transaction);
			const query = await updateRowFromTableWithId<DB.Transaction>({
				table: "Transaction",
				columnsAndPlaceholders: setString,
				values,
				id: transaction.id,
				idName: "transactionId",
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(transaction),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Transaction")
		);

		return query;
	},
};
