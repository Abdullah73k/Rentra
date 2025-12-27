import { StatusCodes } from "../constants/status-codes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbDeleteMessage,
	failedDbGetMessage,
	failedDbInsertMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	deleteDocumentsFromTable,
	deleteRowFromTableWithId,
	executeDataBaseOperation,
	getRowsFromTableWithId,
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
	async deleteDocument(documentId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => deleteRowFromTableWithId(documents, documentId, client),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Documents")
		);

		return query;
	},
	async deleteDocuments(documentIds: string[], client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => deleteDocumentsFromTable(documentIds, client),
			StatusCodes.BAD_REQUEST,
			failedDbDeleteMessage("Documents")
		)
	},
	async getAllDocuments(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId.document({ propertyId, client }),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Documents")
		);

		return query;
	},
	async getDocument(documentId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId.document({ documentId, client }),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Documents")
		);

		return query;
	},
	async getDocumentsPath(documentIds: string[], client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId.documentsPath(documentIds, client),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Documents")
		);

		return query;
	},
};
