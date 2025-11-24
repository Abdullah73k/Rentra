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
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";

export const PropertyRepository = {
	async createProperty(property: DB.CreateProperty) {
		const { columns, values, queryPlaceholders, keys } =
			generateCreateQueryColsAndValues(property);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Property>({
					table: "Property",
					keys,
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
	async updateProperty(property: DB.Property) {
		const dbFn = async (property: DB.Property) => {
			const { setString, values } = buildUpdateSet(property);
			const query = await updateRowFromTableWithId<DB.Property>({
				table: "Property",
				columnsAndPlaceholders: setString,
				values,
				id: property.id,
				idName: "id",
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(property),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Property")
		);

		return query;
	},
};
