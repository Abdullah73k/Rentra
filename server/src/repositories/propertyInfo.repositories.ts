import {
	buildUpdateSet,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";
import * as DB from "../types/db.types.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import { PROPERTY_INFO_COLUMNS } from "../constants/db-table-columns.constants.js";

export const PropertyInfoRepository = {
	async createPropertyInfo(propertyInfo: DB.CreatePropertyInfo) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(propertyInfo);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.PropertyInfo>({
					table: "PropertyInfo",
					columns,
					keys,
					colValidation: PROPERTY_INFO_COLUMNS,
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
	async updatePropertyInfo(propertyInfo: DB.PropertyInfo) {
		const dbFn = async (propertyInfo: DB.PropertyInfo) => {
			const { setString, values } = buildUpdateSet(propertyInfo);
			const query = await updateRowFromTableWithId<DB.PropertyInfo>({
				table: "PropertyInfo",
				columnsAndPlaceholders: setString,
				values,
				id: propertyInfo.id,
				idName: "id",
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(propertyInfo),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("PropertyInfo")
		);

		return query;
	},
};
