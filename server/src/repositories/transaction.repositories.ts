import type { PoolClient } from "../utils/service.utils.js";
import { TRANSACTION_COLUMNS } from "../constants/db-table-columns.constants.js";
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
	async createTransaction(
		transaction: DB.CreateTransaction,
		client?: PoolClient
	) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(transaction);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Transaction>({
					table: "Transaction",
					keys,
					colValidation: TRANSACTION_COLUMNS,
					columns,
					queryPlaceholders,
					values,
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Transaction")
		);

		return query;
	},
	async delete(transactionId: string, client?: PoolClient) {
		await executeDataBaseOperation(
			() =>
				deleteRowFromTableWithId({
					table: "Transaction",
					idName: "id",
					id: transactionId,
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Transaction")
		);
	},
	async getTransaction(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Transaction>({
					table: "Transaction",
					id: propertyId,
					idName: "propertyId",
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Transaction")
		);

		return query;
	},
	async updateTransaction(transaction: DB.Transaction, client?: PoolClient) {
		const dbFn = async (transaction: DB.Transaction, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(transaction);
			const query = await updateRowFromTableWithId<DB.Transaction>({
				table: "Transaction",
				columnsAndPlaceholders: setString,
				values,
				keys,
				colValidation: TRANSACTION_COLUMNS,
				id: transaction.id,
				idName: "id",
				client,
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(transaction, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Transaction")
		);

		return query;
	},
};
