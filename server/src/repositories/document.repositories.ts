import * as DB from "../types/db.types.js";
import {
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const DocumentRepository = {
	async createDocument(document: DB.CreateDocument) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(document);

		const query = insertIntoTable<DB.Document>({
			table: "Documents",
			columns,
			queryPlaceholders,
			values,
		});

		return query;
	},
};
