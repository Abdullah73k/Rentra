import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
} from "../utils/repository.utils.js";
import * as DB from "../types/db.types.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
} from "../utils/failed-db-messages.utils.js";

export const PropertyInfoRepository = {
	async createPropertyInfo(propertyInfo: DB.CreatePropertyInfo) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(propertyInfo);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.PropertyInfo>({
					table: "PropertyInfo",
					columns,
					queryPlaceholders,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "PropertyInfo")
		);

		return query;
	},
	async getPropertyInfo(propertyId: string) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.PropertyInfo>({
					table: "PropertyInfo",
					id: propertyId,
					idName: "propertyId",
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("PropertyInfo")
		);

		return query;
	},
};
