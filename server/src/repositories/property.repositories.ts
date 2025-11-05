import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const PropertyRepository = {
	async createProperty(property: DB.CreateProperty) {
		const { columns, values, queryPlaceholders } =
			generateCreateQueryColsAndValues(property);

		const query = await insertIntoTable<DB.Property>({
			table: "Property",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
	async getProperties(userId: string) {
		const query = await getRowsFromTableWithId<DB.Property>({
			table: "Property",
			id: userId,
			idName: "userId",
		});

		return query;
	},
};
