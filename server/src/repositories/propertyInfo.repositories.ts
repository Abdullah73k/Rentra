import {
	buildUpdateSet,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	insertIntoTableDrizzle,
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
import type { PoolClient } from "../utils/service.utils.js";
import { propertyInfo } from "../db/schemas/property-info.db.js";

export const PropertyInfoRepository = {
	async createPropertyInfo(
		propertyInfoObject: DB.CreatePropertyInfo,
		propertyId: string,
		client?: PoolClient
	) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(propertyInfoObject);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTableDrizzle(propertyInfo, {
					propertyId,
					...propertyInfoObject,
				}),
			// insertIntoTable<DB.PropertyInfo>({
			// 	table: "PropertyInfo",
			// 	columns,
			// 	keys,
			// 	colValidation: PROPERTY_INFO_COLUMNS,
			// 	queryPlaceholders,
			// 	values,
			// 	client,
			// }),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "PropertyInfo")
		);

		return query;
	},
	async getPropertyInfo(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.PropertyInfo>({
					table: "PropertyInfo",
					id: propertyId,
					idName: "propertyId",
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("PropertyInfo")
		);

		return query;
	},
	async updatePropertyInfo(propertyInfo: DB.PropertyInfo, client?: PoolClient) {
		const dbFn = async (propertyInfo: DB.PropertyInfo, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(propertyInfo);
			const query = await updateRowFromTableWithId<DB.PropertyInfo>({
				table: "PropertyInfo",
				columnsAndPlaceholders: setString,
				values,
				keys,
				colValidation: PROPERTY_INFO_COLUMNS,
				id: propertyInfo.id,
				idName: "id",
				client,
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(propertyInfo, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("PropertyInfo")
		);

		return query;
	},
};
