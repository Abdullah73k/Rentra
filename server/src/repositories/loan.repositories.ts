import type { PoolClient } from "../utils/service.utils.js";
import { LOAN_COLUMNS } from "../constants/db-table-columns.constants.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	buildUpdateSet,
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
			() => insertIntoTable(loan, { ...loanObject, propertyId }),
			// 	insertIntoTable<DB.Loan>({
			// 		table: "Loan",
			// 		columns,
			// 		keys,
			// 		colValidation: LOAN_COLUMNS,
			// 		queryPlaceholders,
			// 		client,
			// 		values,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Loan")
		);

		return query;
	},
	async getLoan(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId(loan, propertyId, client),
			// 	getRowsFromTableWithId<DB.Loan>({
			// 		table: "Loan",
			// 		id: propertyId,
			// 		idName: "propertyId",
			// 		client,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Loan")
		);

		return query;
	},
	async updateLoan(loanObject: DB.Loan, client?: PoolClient) {
		const dbFn = async (loanObject: DB.Loan, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(loanObject);
			const query = await updateRowFromTableWithId(
				loan,
				loanObject,
				loanObject.id,
				client
			);
			// const query = await updateRowFromTableWithId<DB.Loan>({
			// 	table: "Loan",
			// 	columnsAndPlaceholders: setString,
			// 	keys,
			// 	colValidation: LOAN_COLUMNS,
			// 	values,
			// 	id: loan.id,
			// 	client,
			// 	idName: "id",
			// });

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
