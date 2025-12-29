import type { Request, Response } from "express";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { validateUUID } from "../utils/validation.utils.js";
import { ValidationError } from "../errors/validation.errors.js";
import { DocumentService } from "../services/document.services.js";

/**
 *
 * Path for property photos in bucket: \
 * users/:userId/properties/:propertyId/photo/:documentId-documentName
 */
export const postPropertyPhotos = async (
	req: Request<{ propertyId: string }, {}, {}, { type: "photo" | "document" }>,
	res: Response
) => {
	const { type } = req.query;
	const { propertyId } = req.params;
	const userId = req.user?.id;
	const files = req.files;

	if (!userId) return 
	console.log("Files: ", files);
	console.log("Type: ", type);
	console.log("PropertyId: ", propertyId);
	console.log("UserId: ", userId);

	if (!files || !Array.isArray(files) || files.length === 0) {
		throw new ValidationError("No file uploaded");
	}

	const response = [];

	for (const file of files) {
		const res = await DocumentService.create({
			propertyId,
			userId,
			file,
			type,
		});

		response.push(res);
	}
	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully created document",
		data: response,
	});
};

export const deletePropertyDoc = async (
	req: Request<{}, {}, { documentIds: string[] }, {}>,
	res: Response
) => {
	const { documentIds } = req.body;

	documentIds.forEach((id) => {
		const result = validateUUID(id);

		if (result.error)
			throw new ValidationError("Invalid document or property Id");
	});

	await DocumentService.delete({ documentIds });

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully deleted document",
	});
};

export const getPropertyDoc = async (req: Request, res: Response) => {};
