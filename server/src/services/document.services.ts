import { randomUUID } from "node:crypto";
import { DocumentRepository } from "../repositories/document.repositories.js";
import { insertPhotoInBucket } from "../utils/bucket.utils.js";
import type { CreateDocument } from "../types/db.types.js";
import { documentSchema } from "../schemas/post.schemas.js";
import { ValidationError } from "../errors/validation.errors.js";

export const DocumentService = {
	async create(propertyId: string, userId: string, file: Express.Multer.File) {
		const documentId = randomUUID();
		const response = await insertPhotoInBucket({
			userId,
			propertyId,
			documentId,
			documentName: file.originalname,
			file,
		});

		const documentData: CreateDocument = {
			id: documentId,
			propertyId,
			userId,
			name: file.originalname,
			path: response.path,
			type: "photo",
			contentType: file.mimetype,
			sizeBytes: file.size,
		};

		const zodDocumentData = documentSchema.safeParse(documentData);

		if (!zodDocumentData.success) {
			throw new ValidationError("Invalid document data");
		}

		const query = await DocumentRepository.createDocument(zodDocumentData.data);
		return query;
	},
	async delete() {},
	async get() {},
};
