import type { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import {
	validateUUID,
} from "../utils/validation.utils.js";
import { ValidationError } from "../errors/validation.errors.js";
import { DocumentService } from "../services/document.services.js";

/**
 *
 * Path for property photos in bucket: \
 * users/:userId/properties/:propertyId/photo/:documentId-documentName
 */
export const postPropertyPhotos = async (
	req: Request<
		{ propertyId: string; userId: string },
		{},
		{},
		{ type: "photo" | "document" }
	>,
	res: Response
) => {
	const { type } = req.query;
	const { propertyId, userId } = req.params;
	const files = req.files;

	if (!files || !Array.isArray(files) || files.length === 0) {
		throw new ValidationError("No file uploaded");
	}

	const response = [];

	for (const file of files) {
		const res = await DocumentService.create(propertyId, userId, file, type);

		response.push(res);
	}
	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Document created",
		data: response,
	});
};

export const deletePropertyDoc = async (
	req: Request<{ documentId: string; propertyId: string }>,
	res: Response
) => {
	const { documentId, propertyId } = req.params;
	const result = validateUUID(documentId);
	const result2 = validateUUID(propertyId);

	if (result.error || result2.error)
		throw new ValidationError("Invalid document or property Id");

	await DocumentService.delete(documentId, propertyId);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Document deleted",
	});
};

export const getPropertyDoc = async (req: Request, res: Response) => {};
