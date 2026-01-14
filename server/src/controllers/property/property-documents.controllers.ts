import type { Request, Response } from "express";
import { StatusCodes } from "../../constants/status-codes.constants.js";
import { validateUUID } from "../../utils/validation.utils.js";
import { ValidationError } from "../../errors/validation.errors.js";
import { DocumentService } from "../../services/document.services.js";
import { propertyPrivateDocsSchema } from "../../schemas/util.schemas.js";
import * as API from "../../types/api.types.js";
import { property } from "zod";

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
		message: "Successfully created documents",
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

export const getPropertyPrivateDocs = async (
	req: Request<
		{},
		{},
		API.PropertyPrivateDocsIds,
		API.PropertyPrivateDocsLabel
	>,
	res: Response
) => {
	const result = propertyPrivateDocsSchema.safeParse({
		...req.body,
		...req.query,
	});

	if (!result.success) {
		throw new ValidationError("Invalid Ids or label");
	}

	const { label, leaseId, loanId, tenantId, propertyId } = result.data;

	const id = leaseId || loanId || tenantId || propertyId;

	const documents = await DocumentService.getPrivateDocs({ label, id });

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully retrieved documents",
		data: documents,
	});
};

export const postPropertyPrivateDocs = async (
	req: Request<
		{},
		{},
		API.PropertyPrivateDocsIds,
		API.PropertyPrivateDocOptions
	>,
	res: Response
) => {
	const files = req.files;

	if (!files || !Array.isArray(files) || files.length === 0) {
		throw new ValidationError("No file uploaded");
	}

	const result = propertyPrivateDocsSchema.safeParse({
		...req.body,
		...req.query,
	});

	if (!result.success) {
		throw new ValidationError("Invalid Ids or label");
	}

	const { label, leaseId, loanId, tenantId, type, propertyId } = result.data;
	const id = leaseId || loanId || tenantId;

	if (!propertyId || !type) {
		throw new ValidationError("Property Id or type is required");
	}

	const urls = await Promise.all(
		files.map((file) =>
			DocumentService.create({
				propertyId,
				...(id && { referenceId: id }),
				userId: req.user?.id!,
				file,
				type,
				label,
			})
		)
	);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully created documents",
		data: urls,
	});
};
