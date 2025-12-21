import { DOCUMENT_COLUMNS } from "../constants/db-table-columns.constants.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import { failedDbInsertMessage } from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	insertIntoTable,
} from "../utils/repository.utils.js";
import type { PoolClient } from "../utils/service.utils.js";

import { documents } from "../db/schemas/document.db.js";

export const DocumentRepository = {
	async createDocument(document: DB.CreateDocument, client?: PoolClient) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(document);

		const query = await executeDataBaseOperation(
			() => insertIntoTable(documents, document),
			// 	insertIntoTable<DB.Document>({
			// 		table: "Documents",
			// 		columns,
			// 		keys,
			// 		colValidation: DOCUMENT_COLUMNS,
			// 		queryPlaceholders,
			// 		values,
			// 		client,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Documents")
		);

		return query;
	},
};
