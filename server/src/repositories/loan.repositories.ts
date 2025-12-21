import type { PoolClient } from "../utils/service.utils.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";

import { loan } from "../db/schemas/loan.db.js";

export const LoanRepository = {
	async createLoan(
		loanObject: DB.CreateLoan,
		propertyId: string,
		client?: PoolClient
	) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(loanObject);

		const query = await executeDataBaseOperation(
			() => insertIntoTable(loan, { ...loanObject, propertyId }, client),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Loan")
		);

		return query;
	},
	async getLoan(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId(loan, propertyId, client),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Loan")
		);

		return query;
	},
	async updateLoan(loanObject: DB.Loan, client?: PoolClient) {
		const dbFn = async (loanObject: DB.Loan, client?: PoolClient) => {
			const query = await updateRowFromTableWithId(
				loan,
				loanObject,
				loanObject.id,
				client
			);
			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(loanObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Loan")
		);

		return query;
	},
};
