import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
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
import type { PrivateDocs } from "../types/util.types.js";
import {
	photoPathBuilder,
	privateDocsPathBuilder,
} from "../utils/doc-path-builder.utils.js";
import { BackboardService } from "./backboard.service.js";
import { dbConnection } from "../utils/db-connects.utils.js";
import { aiThreads } from "../db/schemas/ai-thread.db.js";

export const DocumentService = {
	async create({
		referenceId,
		propertyId,
		userId,
		label,
		file,
		type,
	}: {
		referenceId?: string;
		propertyId: string;
		label?: PrivateDocs;
		userId: string;
		file: MulterFile;
		type: "photo" | "document";
	}) {
		const documentId = randomUUID();

		const labelName =
			label === "leaseDocs"
				? "leases"
				: label === "loanDocs"
					? "loans"
					: label === "tenantDocs"
						? "tenants"
						: undefined;
		const id = labelName?.slice(0, -1) + "Id";

		const bucketName =
			type === "photo"
				? SUPABASE_PUBLIC_BUCKET_NAME
				: SUPABASE_PRIVATE_BUCKET_NAME;

		const path =
			type === "photo"
				? photoPathBuilder({
						propertyId,
						documentId,
						documentName: file.originalname,
						userId,
					})
				: privateDocsPathBuilder({
						userId,
						referenceId: referenceId!,
						documentId,
						documentName: file.originalname,
						propertyId,
						label: labelName,
					});

		const response = await insertFileInBucket({
			path,
			file,
			bucketName,
		});

		const documentData: CreateDocument = {
			id: documentId,
			...(id && { [id]: referenceId }), // Dynamic key based on document type, leaseId, loanId, or tenantId
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

		// Mirror document to Backboard for AI querying (fire-and-forget, only for documents)
		if (type === "document" && file.buffer) {
			try {
				const db = dbConnection();
				let userThread = await db
					.select()
					.from(aiThreads)
					.where(eq(aiThreads.userId, userId))
					.limit(1)
					.then((rows) => rows[0] ?? null);

				// Lazily create assistant if user doesn't have one
				if (!userThread) {
					const assistant = await BackboardService.createAssistant(
						`Rentra Assistant - ${userId}`,
					);
					const thread = await BackboardService.createThread(
						assistant.assistant_id,
					);
					const newRow = {
						id: randomUUID(),
						userId,
						assistantId: assistant.assistant_id,
						threadId: thread.thread_id,
					};
					await db.insert(aiThreads).values(newRow);
					userThread = { ...newRow, createdAt: new Date() };
				}

				await BackboardService.uploadDocument(
					userThread.assistantId,
					file.buffer,
					file.originalname,
					file.mimetype,
				);
				console.log(`[Backboard] Document synced: ${file.originalname}`);
			} catch (backboardError) {
				// Don't fail the upload if Backboard sync fails
				console.error("[Backboard] Document sync failed:", backboardError);
			}
		}

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
	async getPrivateDocs({ label, id }: { label: PrivateDocs; id: string }) {
		const privateDocs = await DocumentRepository.getPrivateDocuments(label, id);
		const paths = privateDocs.map((doc) => doc.path);
		if (paths.length === 0) return [];

		const signedURLs = await createSignedURLs(paths);

		return signedURLs.map((url) => url.signedUrl);
	},
};
