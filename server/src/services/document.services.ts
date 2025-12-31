import { randomUUID } from "node:crypto";
import { DocumentRepository } from "../repositories/document.repositories.js";
import {
	createSignedURLs,
	deleteFileFromBucket,
	insertFileInBucket,
} from "../utils/bucket.utils.js";
import {
	SUPABASE_PRIVATE_BUCKET_NAME,
	SUPABASE_PUBLIC_BUCKET_NAME,
} from "../constants/supabase.constants.js";
import type { CreateDocument } from "../types/db.types.js";
import { documentSchema } from "../schemas/post.schemas.js";
import { ValidationError } from "../errors/validation.errors.js";
import type { MulterFile } from "../types/util.types.js";
import type { PrivateDocs } from "../controllers/property-documents.controllers.js";
import { photoPathBuilder } from "../utils/doc-path-builder.utils.js";

export const DocumentService = {
	async create({
		propertyId,
		userId,
		file,
		type,
	}: {
		propertyId: string;
		userId: string;
		file: MulterFile;
		type: "photo" | "document"; 
	}) {
		const documentId = randomUUID();

		const bucketName =
			type === "photo"
				? SUPABASE_PUBLIC_BUCKET_NAME
				: SUPABASE_PRIVATE_BUCKET_NAME;

		const path = photoPathBuilder({
			propertyId,
			documentId,
			documentName: file.originalname,
			userId,
		});
		const response = await insertFileInBucket({
			path,
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
	async getPrivateDocs({ type, id }: { type: PrivateDocs; id: string }) {
		const privateDocs = await DocumentRepository.getPrivateDocuments(type, id);
		const paths = privateDocs.map((doc) => doc.path);
		const signedURLs = await createSignedURLs(paths);

		return signedURLs.map((url) => url.signedUrl);
	},
};
