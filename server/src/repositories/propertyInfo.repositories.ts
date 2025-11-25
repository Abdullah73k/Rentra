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
import type { PoolClient } from "pg";

export const PropertyInfoRepository = {
	async createPropertyInfo(
		propertyInfo: DB.CreatePropertyInfo,
		client?: PoolClient
	) {
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
					client,
				}),
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
