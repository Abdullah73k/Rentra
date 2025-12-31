import type { Request, Response } from "express";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { validateUUID } from "../utils/validation.utils.js";
import { ValidationError } from "../errors/validation.errors.js";
import { DocumentService } from "../services/document.services.js";

export type PrivateDocs = "leaseDocs" | "loanDocs" | "tenantDocs";
export type PrivateDocsIds =
	| { leaseId: string; loanId?: never; tenantId?: never }
	| { leaseId?: never; loanId: string; tenantId?: never }
	| { leaseId?: never; loanId?: never; tenantId: string };

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

	console.log("Files: ", files);
	console.log("Type: ", type);
	console.log("PropertyId: ", propertyId);
	console.log("UserId: ", userId);

	if (!files || !Array.isArray(files) || files.length === 0) {
		throw new ValidationError("No file uploaded");
	}

	const userIdResult = validateUUID(userId);
	if (!userIdResult.success) throw new ValidationError("Invalid User Id");
	const validUserId = userIdResult.data;

	const response = [];

	for (const file of files) {
		const res = await DocumentService.create({
			propertyId,
			userId: validUserId,
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

export const getPropertyPrivateDocs = async (
	req: Request<PrivateDocsIds, {}, {}, { type: PrivateDocs }>,
	res: Response
) => {
	const { type } = req.query;
	const { leaseId, loanId, tenantId } = req.params;

	const leaseIdResult = validateUUID(leaseId);
	const loanIdResult = validateUUID(loanId);
	const tenantIdResult = validateUUID(tenantId);

	if (
		!leaseIdResult.success &&
		!loanIdResult.success &&
		!tenantIdResult.success
	) {
		throw new ValidationError("Invalid Ids");
	}

	const id = [
		leaseIdResult.data,
		loanIdResult.data,
		tenantIdResult.data,
	].filter((id) => id !== undefined);

	const documents = await DocumentService.getPrivateDocs({ type, id: id[0]! });

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully retrieved document",
		data: documents,
	});
}; 
