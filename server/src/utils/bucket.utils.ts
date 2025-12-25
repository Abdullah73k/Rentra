import { StatusCodes } from "../constants/statusCodes.constants.js";
import { SUPABASE_BUCKET_NAME } from "../constants/supabase.constants.js";
import { supabase } from "../db/configs/supabase.config.js";
import { DBError } from "../errors/db.errors.js";
import {
	photoPathBuilder,
	type PhotoPathBuilderConfig,
} from "./doc-path-builder.utils.js";

export async function insertPhotoInBucket({
	file,
	userId,
	propertyId,
	documentId,
	documentName,
}: PhotoPathBuilderConfig & {
	file: Express.Multer.File;
}) {
	const path = photoPathBuilder({
		propertyId,
		documentId,
		documentName,
		userId,
	});

	const { data, error } = await supabase.storage
		.from(SUPABASE_BUCKET_NAME)
		.upload(path, file.buffer, {
			contentType: file.mimetype,
		});

	if (error)
		throw new DBError(StatusCodes.BAD_REQUEST, error.message, error.name);

	return data;
}
