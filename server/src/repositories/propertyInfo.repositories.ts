import {
	executeDataBaseOperation,
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
import type { PoolClient } from "../utils/service.utils.js";
import { propertyInfo } from "../db/schemas/property-info.db.js";

export const PropertyInfoRepository = {
	async createPropertyInfo(
		propertyInfoObject: DB.CreatePropertyInfo,
		propertyId: string,
		client?: PoolClient
	) {
		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable(
					propertyInfo,
					{
						propertyId,
						...propertyInfoObject,
					},
					client
				),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage("PropertyInfo")
		);

		return query;
	},
	async getPropertyInfo(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId.propertyInfo(propertyId, client),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("PropertyInfo")
		);

		return query;
	},
	async updatePropertyInfo(
		propertyId: string,
		propertyInfoObject: DB.PropertyInfo,
		client?: PoolClient
	) {
		const dbFn = async (
			propertyInfoObject: DB.PropertyInfo,
			client?: PoolClient
		) => {
			const query = await updateRowFromTableWithId.propertyInfo(
				propertyId,
				propertyInfoObject,
				client
			);

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(propertyInfoObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("PropertyInfo")
		);

		return query;
	},
};
