import multer from "multer";
import type { RequestHandler } from "express";
import { ValidationError } from "../errors/validation.errors.js";

const PROPERTY_PHOTOS_MAX_FILES = 10;
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const AVATAR_MAX_FILES = 1;

export const uploadPropertyPhotos: RequestHandler = multer({
	storage: multer.memoryStorage(),
	limits: {
		files: PROPERTY_PHOTOS_MAX_FILES,
		fileSize: MAX_FILE_SIZE,
	},
	fileFilter(req, file, callback) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			return callback(new ValidationError("Invalid file type"));
		}
		callback(null, true);
	},
}).array("photos", PROPERTY_PHOTOS_MAX_FILES);

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
