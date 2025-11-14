import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "../../constants/statusCodes.constants.js";
import {
	validateUUID,
	validatePropertyData,
	pruneUndefined,
} from "../../utils/validation.utils.js";
import * as API from "../../types/api.types.js";
import * as DB from "../../types/db.types.js";
import { PropertyService } from "../../services/property.services.js";
import { ValidationError } from "../../errors/validation.errors.js";

export const getUserPropertyData = (
	req: Request<{ propertyId: string }, {}, {}, {}>,
	res: Response
) => {
	// 1. Validate propertyId as valid UUID
	const { propertyId } = req.params;
	const result = validateUUID(propertyId);
	if (!result.success) throw new ValidationError("Invalid property Id");
	// 2. Query DB to get all property info

	// 3. Send response based on property info stored in DB

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully fetched user property and all associated info",
		data: {
			property: {},
			propertyInfo: {},
			loan: {},
			tenant: {},
			lease: {},
			transaction: {},
		},
	});
};

export const getUserProperties = async (
	req: Request<{ userId: string }>,
	res: Response
) => {
	const { userId } = req.params;
	const result = validateUUID(userId);

	// checking if userId is a valid UUID
	if (!result.success) throw new ValidationError("Invalid user Id");

	const properties = await PropertyService.getAll(userId);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully fetched user properties",
		data: properties,
	});
};

export const postPropertyData = async (
	req: Request<{}, {}, API.POSTPropertyData>,
	res: Response
) => {
	const propertyData = req.body;

	const result = validatePropertyData<
		API.POSTPropertyData,
		DB.POSTPropertyData
	>(propertyData);

	if (!result.success)
		throw new ValidationError("Invalid property data", result.errors);
	const zodPropertyData = result.data;

	const response = await PropertyService.create(zodPropertyData);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Property Created",
		data: response,
	});
};

export const deleteUserProperty = async (
	req: Request<{ propertyId: string }, {}, {}, {}>,
	res: Response
) => {
	// 1. Validate property Id
	const { propertyId } = req.params;
	const result = validateUUID(propertyId);
	if (!result.success) throw new ValidationError("Invalid property Id");

	// 2. Query DB to delete property
	await PropertyService.delete(propertyId);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully deleted property",
	});

	// I need to handle this with error middleware
	// return res.status(StatusCodes.NOT_FOUND).json({
	// 	error: true,
	// 	message: "Property doesn't exist",
	// });
};

export const patchPropertyData = (
	req: Request<{ propertyId: string }, {}, API.PATCHPropertyData>,
	res: Response
) => {
	const propertyInfo = req.body;

	const { propertyId } = req.params;

	const propertyInfoResult = validatePropertyData(propertyInfo, true);
	const propertyIdResult = validateUUID(propertyId);

	// validate property info data
	if (!propertyInfoResult.success)
		throw new ValidationError(
			"Invalid property data",
			propertyInfoResult.errors
		);

	// validate property Id
	if (!propertyIdResult.success)
		throw new ValidationError("Invalid property Id");

	const validatedPropertyInfo = propertyInfoResult.data;

	const cleanedData = pruneUndefined(validatedPropertyInfo);

	// check if there is nothing
	if (
		!cleanedData.property &&
		!cleanedData.propertyInfo &&
		!cleanedData.loan &&
		!cleanedData.tenant &&
		!cleanedData.lease
	) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: true,
			message: "No fields provided to update",
		});
	}

	// use cleaned data to update db

	return res.status(StatusCodes.CREATED).json({
		error: false,
		message: "Property updated",
		data: cleanedData, // data should not be cleaned data but the object returned by the data base
	});
};
