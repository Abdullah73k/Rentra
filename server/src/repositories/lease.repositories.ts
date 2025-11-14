import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
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
	async getLease(propertyId: string) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Lease>({
					table: "Lease",
					id: propertyId,
					idName: "propertyId",
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Lease")
		);

		return query;
	},
};
