import { StatusCodes } from "../constants/status-codes.constants.js";
import { SUPABASE_PUBLIC_BUCKET_NAME } from "../constants/supabase.constants.js";
import { supabase } from "../db/configs/supabase.config.js";
import { DBError } from "../errors/db.errors.js";
import type { MulterFile } from "../types/util.types.js";
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
	file: MulterFile;
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
	bucket,
	paths,
}: {
	bucket: string;
	paths: string[];
}) {
	const { data, error } = await supabase.storage.from(bucket).remove(paths);

	if (error) {
		throw new DBError(StatusCodes.BAD_REQUEST, error.message, error.name);
	}
}

export function getFilePublicURL({
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
