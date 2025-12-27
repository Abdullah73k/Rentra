import { randomUUID } from "node:crypto";
import { DocumentRepository } from "../repositories/document.repositories.js";
import {
	deleteFileFromBucket,
	getFilePublicURL,
	insertFileInBucket,
} from "../utils/bucket.utils.js";
import {
	SUPABASE_PRIVATE_BUCKET_NAME,
	SUPABASE_PUBLIC_BUCKET_NAME,
} from "../constants/supabase.constants.js";
import type { CreateDocument } from "../types/db.types.js";
import { documentSchema } from "../schemas/post.schemas.js";
import { ValidationError } from "../errors/validation.errors.js";

export const DocumentService = {
	async create({
		propertyId,
		userId,
		file,
		type,
	}: {
		propertyId: string;
		userId: string;
		file: Express.Multer.File;
		type: "photo" | "document";
	}) {
		const documentId = randomUUID();

		const bucketName =
			type === "photo"
				? SUPABASE_PUBLIC_BUCKET_NAME
				: SUPABASE_PRIVATE_BUCKET_NAME;

		const response = await insertFileInBucket({
			userId,
			propertyId,
			documentId,
			documentName: file.originalname,
			file,
			bucketName,
		});

		const documentData: CreateDocument = {
			id: documentId,
			propertyId,
			userId,
			name: file.originalname,
			path: response.path,
			type,
			contentType: file.mimetype,
			sizeBytes: file.size,
		};

		const zodDocumentData = documentSchema.safeParse(documentData);

		if (!zodDocumentData.success) {
			throw new ValidationError("Invalid document data");
		}

		const query = await DocumentRepository.createDocument(zodDocumentData.data);
		return response.publicUrl;
	},
	async delete({ documentIds }: { documentIds: string[] }) {
		const paths = await DocumentRepository.getDocumentsPath(documentIds);

		await deleteFileFromBucket({
			bucket: SUPABASE_PUBLIC_BUCKET_NAME,
			paths,
		});

		await DocumentRepository.deleteDocuments(documentIds);
	},
	async get() {},
};
