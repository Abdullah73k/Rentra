import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import { failedDbInsertMessage } from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	insertIntoTable,
} from "../utils/repository.utils.js";
import type { PoolClient } from "../utils/service.utils.js";

import { documents } from "../db/schemas/document.db.js";

export const DocumentRepository = {
	async createDocument(document: DB.CreateDocument, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => insertIntoTable(documents, document, client),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage("Documents")
		);

		return query;
	},
};
