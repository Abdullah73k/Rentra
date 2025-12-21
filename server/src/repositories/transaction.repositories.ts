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

import { transaction } from "../db/schemas/transaction.db.js";

export const TransactionRepository = {
	async createTransaction(
		transactionObject: DB.CreateTransaction,
		client?: PoolClient
	) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(transactionObject);

		const query = await executeDataBaseOperation(
			() => insertIntoTable(transaction, transactionObject),
			// 	insertIntoTable<DB.Transaction>({
			// 		table: "Transaction",
			// 		keys,
			// 		colValidation: TRANSACTION_COLUMNS,
			// 		columns,
			// 		queryPlaceholders,
			// 		values,
			// 		client,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Transaction")
		);

		return query;
	},
	async delete(transactionId: string, client?: PoolClient) {
		await executeDataBaseOperation(
			() => deleteRowFromTableWithId(transaction, transactionId, client),
			// 	deleteRowFromTableWithId({
			// 		table: "Transaction",
			// 		idName: "id",
			// 		id: transactionId,
			// 		client,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Transaction")
		);
	},
	async getTransaction(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId(transaction, propertyId, client),
			// 	getRowsFromTableWithId<DB.Transaction>({
			// 		table: "Transaction",
			// 		id: propertyId,
			// 		idName: "propertyId",
			// 		client,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Transaction")
		);

		return query;
	},
	async updateTransaction(
		transactionObject: DB.Transaction,
		client?: PoolClient
	) {
		const dbFn = async (
			transactionObject: DB.Transaction,
			client?: PoolClient
		) => {
			const { setString, values, keys } = buildUpdateSet(transactionObject);
			const query = await updateRowFromTableWithId(
				transaction,
				transactionObject,
				transactionObject.id,
				client
			);
			// const query = await updateRowFromTableWithId<DB.Transaction>({
			// 	table: "Transaction",
			// 	columnsAndPlaceholders: setString,
			// 	values,
			// 	keys,
			// 	colValidation: TRANSACTION_COLUMNS,
			// 	id: transaction.id,
			// 	idName: "id",
			// 	client,
			// });

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(transactionObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Transaction")
		);

		return query;
	},
};
