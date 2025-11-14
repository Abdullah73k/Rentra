import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";
import * as DB from "../types/db.types.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import { failedDbInsertMessage } from "../utils/failed-db-messages.utils.js";

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
};
