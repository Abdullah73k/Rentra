import type { PoolClient } from "../utils/service.utils.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbDeleteMessage,
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	deleteRowFromTableWithId,
	executeDataBaseOperation,
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
		const query = await executeDataBaseOperation(
			() => insertIntoTable(transaction, transactionObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage("Transaction")
		);

		return query;
	},
	async delete(transactionId: string, client?: PoolClient) {
		await executeDataBaseOperation(
			() => deleteRowFromTableWithId(transaction, transactionId, client),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Transaction")
		);
	},
	async getTransaction(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId.transaction(propertyId, client),
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
			const query = await updateRowFromTableWithId.transaction(
				transactionObject.id,
				transactionObject,
				client
			);

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
