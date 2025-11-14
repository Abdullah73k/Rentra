import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import { failedDbInsertMessage } from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const LeaseRepository = {
	async createLease(lease: DB.CreateLease) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(lease);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Lease>({
					table: "Lease",
					columns,
					queryPlaceholders,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Lease")
		);

		return query;
	},
};
