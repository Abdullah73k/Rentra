import type { PoolClient } from "../utils/service.utils.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbDeleteMessage,
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";

import {
	deleteRowFromTableWithId,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";
import { property } from "../db/schemas/property.db.js";

export const PropertyRepository = {
	async createProperty(propertyObject: DB.CreateProperty, client?: PoolClient) {
		const { columns, values, queryPlaceholders, keys } =
			generateCreateQueryColsAndValues(propertyObject);

		const query = await executeDataBaseOperation(
			() => insertIntoTable(property, propertyObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Property")
		);

		return query;
	},
	async getProperties(userId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId(property, userId, client),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Property")
		);

		return query;
	},
	async deleteProperty(propertyId: string, client?: PoolClient) {
		await executeDataBaseOperation(
			() => deleteRowFromTableWithId(property, propertyId, client),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Property")
		);
	},
	async updateProperty(propertyObject: DB.Property, client?: PoolClient) {
		const dbFn = async (propertyObject: DB.Property, client?: PoolClient) => {
			const query = await updateRowFromTableWithId(
				property,
				propertyObject,
				propertyObject.id,
				client
			);

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(propertyObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Property")
		);

		return query;
	},
};
