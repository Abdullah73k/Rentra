import multer from "multer";
import type { RequestHandler } from "express";
import { ValidationError } from "../errors/validation.errors.js";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

export const uploadPropertyPhotos: RequestHandler = multer({
	storage: multer.memoryStorage(),
	limits: {
		files: MAX_FILES,
		fileSize: MAX_FILE_SIZE,
	},
	fileFilter(req, file, callback) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			return callback(new ValidationError("Invalid file type"));
		}
		callback(null, true);
	},
}).array("photos", MAX_FILES);
