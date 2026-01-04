import type { Request, Response } from "express";
import { StatusCodes } from "../../constants/status-codes.constants.js";
import {
	validateUUID,
	validatePropertyData,
} from "../../utils/validation.utils.js";
import * as API from "../../types/api.types.js";
import { PropertyService } from "../../services/property.services.js";
import { ValidationError } from "../../errors/validation.errors.js";
import {
	leaseSchema,
	loanSchema,
	tenantSchema,
} from "../../schemas/post.schemas.js";
import * as DB from "../../types/db.types.js";
import { validateOption } from "../../utils/validation.utils.js";

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

export const getUserProperties = async (req: Request, res: Response) => {
	const userId = req.user?.id;

	const result = validateUUID(userId);

	// checking if userId is a valid UUID
	if (!result.success) throw new ValidationError("Invalid user Id");

	const properties = await PropertyService.getAll(result.data);

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

export const postOptionalData = async (
	req: Request<
		{ propertyId: string },
		{},
		DB.CreateOptional,
		{ option: "loan" | "lease" | "tenant" }
	>,
	res: Response
) => {
	const { option } = req.query;
	const { propertyId } = req.params;

	const optionResult = validateOption(option);

	if (!optionResult.success)
		throw new ValidationError(
			"Invalid option. Must be one of: loan, lease, or tenant"
		);

	const propertyIdResult = validateUUID(propertyId);

	const zodSchema =
		optionResult.data === "loan"
			? loanSchema
			: optionResult.data === "lease"
			? leaseSchema
			: tenantSchema;

	const result = zodSchema.safeParse(req.body);

	if (!propertyIdResult.success || !result.success)
		throw new ValidationError(`Invalid ${option} data`);

	const validatedData = { propertyId, ...result.data };

	const response = await PropertyService.createOptionalData(
		optionResult.data,
		validatedData
	);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Optional data created",
		data: response,
	});
};

export const deleteOptionalData = async (
	req: Request<
		{ optionId: string },
		{},
		{},
		{ option: "loan" | "lease" | "tenant" }
	>,
	res: Response
) => {
	const { option } = req.query;
	const { optionId } = req.params;

	const optionIdResult = validateUUID(optionId);
	const optionResult = validateOption(option);

	if (!optionIdResult.success) throw new ValidationError("Invalid option Id");

	if (!optionResult.success)
		throw new ValidationError(
			"Invalid option. Must be one of: loan, lease, or tenant"
		);

	await PropertyService.deleteOptionalData(optionResult.data, optionId);

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: `${optionResult.data} data deleted`,
	});
};
