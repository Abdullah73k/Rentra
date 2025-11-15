import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import { failedDbInsertMessage } from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";

export const DocumentRepository = {
	async createDocument(document: DB.CreateDocument) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(document);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Document>({
					table: "Documents",
					columns,
					queryPlaceholders,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Documents")
		);

		return query;
	},
};
