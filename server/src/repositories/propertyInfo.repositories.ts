import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";
import * as DB from "../types/db.types.js";

export const PropertyInfoRepository = {
	async createPropertyInfo(propertyInfo: DB.CreatePropertyInfo) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(propertyInfo);

		const query = await insertIntoTable<DB.PropertyInfo>({
			table: "PropertyInfo",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
