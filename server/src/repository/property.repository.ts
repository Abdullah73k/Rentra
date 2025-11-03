import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const PropertyRepository = {
	async createProperty(property: DB.Property) {
		const { columns, values, queryPlaceholders } =
			generateCreateQueryColsAndValues<DB.Property>(property);

		const query = await insertIntoTable<DB.Property>({
			table: "Property",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
