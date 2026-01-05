import multer from "multer";
import type { RequestHandler } from "express";
import { ValidationError } from "../errors/validation.errors.js";

export const PROPERTY_PHOTOS_MAX_FILES = 10;
export const DOCUMENTS_MAX_FILES = 5;
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const AVATAR_MAX_FILES = 1;

export const uploadPropertyDocs = ({
	type,
}: {
	type: "photo" | "document";
}) => {
	const PHOTO_REGEX = /\.(jpg|jpeg|png|gif)$/i;
	const DOCUMENT_REGEX = /\.(pdf|doc|docx|txt)$/i;

	const regex = type === "photo" ? PHOTO_REGEX : DOCUMENT_REGEX;

	return multer({
		storage: multer.memoryStorage(),
		limits: {
			files: type === "photo" ? PROPERTY_PHOTOS_MAX_FILES : DOCUMENTS_MAX_FILES,
			fileSize: MAX_FILE_SIZE,
		},
		fileFilter(req, file, callback) {
			if (!file.originalname.match(regex)) {
				return callback(new ValidationError("Invalid file type"));
			}
			callback(null, true);
		},
	});
};
export const uploadAvatar: RequestHandler = multer({
	storage: multer.memoryStorage(),
	limits: {
		files: AVATAR_MAX_FILES,
		fileSize: MAX_FILE_SIZE,
	},
	fileFilter(req, file, callback) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			return callback(new ValidationError("Invalid file type"));
		}
		callback(null, true);
	},
}).single("avatar");