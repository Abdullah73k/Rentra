import type { PoolClient } from "pg";
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

export const LoanRepository = {
	async createLoan(loan: DB.CreateLoan, client?: PoolClient) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(loan);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Loan>({
					table: "Loan",
					columns,
					keys,
					colValidation: LOAN_COLUMNS,
					queryPlaceholders,
					client,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Loan")
		);

		return query;
	},
	async getLoan(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Loan>({
					table: "Loan",
					id: propertyId,
					idName: "propertyId",
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Loan")
		);

		return query;
	},
	async updateLoan(loan: DB.Loan, client?: PoolClient) {
		const dbFn = async (loan: DB.Loan, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(loan);
			const query = await updateRowFromTableWithId<DB.Loan>({
				table: "Loan",
				columnsAndPlaceholders: setString,
				keys,
				colValidation: LOAN_COLUMNS,
				values,
				id: loan.id,
				client,
				idName: "id",
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(loan, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Loan")
		);

		return query;
	},
};
