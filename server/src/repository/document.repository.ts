import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const DocumentRepository = {
	async createDocument(document: DB.Document) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues<DB.Document>(document);

		const query = insertIntoTable<DB.Document>({
			table: "Documents",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
