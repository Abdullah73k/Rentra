import { StatusCodes } from "../constants/status-codes.constants.js";
import {
	SUPABASE_PRIVATE_BUCKET_NAME,
	SUPABASE_PUBLIC_BUCKET_NAME,
} from "../constants/supabase.constants.js";
import { supabase } from "../db/configs/supabase.config.js";
import { DBError } from "../errors/db.errors.js";
import type { MulterFile } from "../types/util.types.js";
import { avatarPathBuilder } from "./doc-path-builder.utils.js";

export async function insertFileInBucket({
	file,
	path,
	bucketName,
}: {
	file: MulterFile;
	path: string;
	bucketName: string;
}) {
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

export async function insertAvatarInBucket({
	file,
	userId,
}: {
	file: MulterFile;
	userId: string;
}) {
	const path = avatarPathBuilder({ userId, avatarName: file.originalname });
	const { data, error } = await supabase.storage
		.from(SUPABASE_PUBLIC_BUCKET_NAME)
		.upload(path, file.buffer, {
			contentType: file.mimetype,
		});

	if (error)
		throw new DBError(StatusCodes.BAD_REQUEST, error.message, error.name);

	let publicUrl: string;

	const { data: publicData } = supabase.storage
		.from(SUPABASE_PUBLIC_BUCKET_NAME)
		.getPublicUrl(path);

	publicUrl = publicData.publicUrl;

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
	id,
}: {
	path: string;
	bucket: string;
	id?: string;
}) {
	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(path);
	return { publicUrl, id };
}

export async function deleteFolderContents({
	bucket,
	folderPath,
}: {
	bucket: string;
	folderPath: string;
}) {
	const { data: files, error: listError } = await supabase.storage
		.from(bucket)
		.list(folderPath);

	if (listError)
		throw new DBError(
			StatusCodes.BAD_REQUEST,
			listError.message,
			listError.name
		);

	if (!files || files.length === 0) return;

	const pathsToDelete = files.map((file) => `${folderPath}/${file.name}`);

	const { error: removeError } = await supabase.storage
		.from(bucket)
		.remove(pathsToDelete);

	if (removeError)
		throw new DBError(
			StatusCodes.BAD_REQUEST,
			removeError.message,
			removeError.name
		);
}

export async function createSignedURLs(path: string[]) {
	const EXPIRY = 60 * 10; // 10 minutes

	const { data, error } = await supabase.storage
		.from(SUPABASE_PRIVATE_BUCKET_NAME)
		.createSignedUrls(path, EXPIRY);

	if (error)
		throw new DBError(StatusCodes.BAD_REQUEST, error.message, error.name);

	return data;
}
