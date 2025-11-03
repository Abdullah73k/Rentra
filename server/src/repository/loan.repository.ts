import * as DB from "../types/db.types.js";
import { generateCreateQueryColsAndValues, insertIntoTable } from "../utils/repository.utils.js";

export const LoanRepository = {
	async createLoan(loan: DB.Loan) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<DB.Loan>(loan);

		const query = insertIntoTable<DB.Loan>({
			table: "Loan",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
