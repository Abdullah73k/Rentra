import type { PoolClient } from "../utils/service.utils.js";
import { PROPERTY_COLUMNS } from "../constants/db-table-columns.constants.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbDeleteMessage,
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";

import {
	buildUpdateSet,
	deleteRowFromTableWithId,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	insertIntoTableDrizzle,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";
import { property } from "../db/schemas/property.db.js";

export const PropertyRepository = {
	async createProperty(propertyObject: DB.CreateProperty, client?: PoolClient) {
		const { columns, values, queryPlaceholders, keys } =
			generateCreateQueryColsAndValues(propertyObject);

		const query = await executeDataBaseOperation(
			() => insertIntoTableDrizzle(property, propertyObject),
			// insertIntoTable<DB.Property>({
			// 	table: "Property",
			// 	keys,
			// 	colValidation: PROPERTY_COLUMNS,
			// 	columns,
			// 	queryPlaceholders,
			// 	values,
			// 	client,
			// }),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Property")
		);

		return query;
	},
	async getProperties(userId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Property>({
					table: "Property",
					id: userId,
					idName: "userId",
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Property")
		);

		return query;
	},
	async deleteProperty(propertyId: string, client?: PoolClient) {
		await executeDataBaseOperation(
			() =>
				deleteRowFromTableWithId({
					table: "Property",
					id: propertyId,
					idName: "id",
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Property")
		);
	},
	async updateProperty(property: DB.Property, client?: PoolClient) {
		const dbFn = async (property: DB.Property, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(property);
			const query = await updateRowFromTableWithId<DB.Property>({
				table: "Property",
				columnsAndPlaceholders: setString,
				values,
				keys,
				colValidation: PROPERTY_COLUMNS,
				client,
				id: property.id,
				idName: "id",
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(property, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Property")
		);

		return query;
	},
};
