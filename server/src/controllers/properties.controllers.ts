import type { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import {
	validateUUID,
	validatePropertyData,
} from "../utils/validation.utils.js";
import * as API from "../types/api.types.js";
import { PropertyService } from "../services/property.services.js";
import { ValidationError } from "../errors/validation.errors.js";

export const getUserPropertyData = async (
	req: Request<{ propertyId: string }, {}, {}, {}>,
	res: Response
) => {
	const { propertyId } = req.params;
	const result = validateUUID(propertyId);
	if (!result.success) throw new ValidationError("Invalid property Id");

	const response = await PropertyService.getAllData(propertyId);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully fetched user property and all associated info",
		data: response,
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

	const result = validatePropertyData<API.POSTPropertyData>(propertyData);

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
};

// TODO: decide on how to update
export const patchPropertyData = async (
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

	const response = await PropertyService.update(validatedPropertyInfo);

	return res.status(StatusCodes.CREATED).json({
		error: false,
		message: "Property updated",
		data: response, // data should not be cleaned data but the object returned by the data base
	});
};

