import { StatusCodes } from "../constants/status-codes.constants.js";
import { SUPABASE_PUBLIC_BUCKET_NAME } from "../constants/supabase.constants.js";
import { supabase } from "../db/configs/supabase.config.js";
import { DBError } from "../errors/db.errors.js";
import {
	photoPathBuilder,
	type PhotoPathBuilderConfig,
} from "./doc-path-builder.utils.js";

export async function insertFileInBucket({
	file,
	userId,
	propertyId,
	documentId,
	documentName,
	bucketName,
}: PhotoPathBuilderConfig & {
	file: Express.Multer.File;
	bucketName: string;
}) {
	const path = photoPathBuilder({
		propertyId,
		documentId,
		documentName,
		userId,
	});

	const { data, error } = await supabase.storage
		.from(bucketName)
		.upload(path, file.buffer, {
			contentType: file.mimetype,
		});

	if (error)
		throw new DBError(StatusCodes.BAD_REQUEST, error.message, error.name);

	let publicUrl: string | null = null;

	if (bucketName === SUPABASE_PUBLIC_BUCKET_NAME) {
		const { data: publicData } = supabase.storage
			.from(bucketName)
			.getPublicUrl(path);

		publicUrl = publicData.publicUrl;
	}

	return { ...data, publicUrl };
}

export async function deleteFileFromBucket({
	bucketName,
	userId,
	propertyId,
	documentId,
	documentName,
}: PhotoPathBuilderConfig & {
	bucketName: string;
}) {
	const path = photoPathBuilder({
		userId,
		propertyId,
		documentId,
		documentName,
	});

	const { data, error } = await supabase.storage
		.from(bucketName)
		.remove([path]);

	if (error) {
		throw new DBError(StatusCodes.BAD_REQUEST, error.message, error.name);
	}
}

export async function getFilePublicURL({
	path,
	bucket,
}: {
	path: string;
	bucket: string;
}) {
	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(path);
	return publicUrl;
}
