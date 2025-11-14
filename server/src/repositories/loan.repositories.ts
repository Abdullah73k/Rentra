import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import { failedDbInsertMessage } from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const LoanRepository = {
	async createLoan(loan: DB.CreateLoan) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(loan);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Loan>({
					table: "Loan",
					columns,
					queryPlaceholders,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Loan")
		);

		return query;
	},
};
