import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbDeleteMessage,
	failedDbGetMessage,
	failedDbInsertMessage,
} from "../utils/failed-db-messages.utils.js";

import {
	deleteRowFromTableWithId,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const PropertyRepository = {
	async createProperty(property: DB.CreateProperty) {
		const { columns, values, queryPlaceholders } =
			generateCreateQueryColsAndValues(property);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Property>({
					table: "Property",
					columns,
					queryPlaceholders,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Property")
		);

		return query;
	},
	// TODO: must add validation in repo for table and idName cuz sql injection
	async getProperties(userId: string) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Property>({
					table: "Property",
					id: userId,
					idName: "userId",
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Property")
		);

		return query;
	},
	// TODO: must add validation in repo for table and idName cuz sql injection
	async deleteProperty(propertyId: string) {
		await executeDataBaseOperation(
			() =>
				deleteRowFromTableWithId({
					table: "Property",
					id: propertyId,
					idName: "id",
				}),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Property")
		);
	},
};
