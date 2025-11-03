import type { Request, Response } from "express";
import { StatusCodes } from "../../constants/statusCodes.constants.js";
import {
	validateUUID,
	validatePropertyInfo,
	pruneUndefined,
} from "../../utils/validation.utils.js";
import * as API from "../../types/api.types.js";
import { pool } from "../../config/pg.config.js";
import * as DB from "../../types/db.types.js";

export const getUserPropertyData = (
	req: Request<{ propertyId: string }, {}, {}, {}>,
	res: Response
) => {
	try {
		// TODO: Must add auth validation once we integrate BetterAuth
		// 1. Validate propertyId as valid UUID
		const { propertyId } = req.params;

		const result = validateUUID(propertyId);

		if (!result.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: true,
				message: "Invalid property Id",
			});
		}
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
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: true,
			message: "Internal server error, could not fetch property info",
		});
	}
};

export const getUserProperties = async (
	req: Request<{ userId: string }>,
	res: Response
) => {
	const { userId } = req.params;
	const result = validateUUID(userId);

	// checking if userId is a valid UUID
	if (!result.success) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: true, message: "Invalid user Id" });
	}

	const zodUserId = result.data;

	try {
		// get user properties from db using userId
		const query = await pool.query<Property>({
			text: `SELECT * FROM "Property" WHERE userId = $1`,
			values: [zodUserId],
		});

		return res.status(StatusCodes.SUCCESS).json({
			error: false,
			message: "Successfully fetched user properties",
			data: query.rows as Property[] | [],
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: true,
			message: "internal server error, could not fetch user Properties",
		});
	}
};

export const postPropertyData = async (
	req: Request<{}, {}, API.POSTPropertyData>,
	res: Response
) => {
	const propertyData = req.body;

	const result = validatePropertyInfo<API.POSTPropertyData, DB.POSTPropertyData>(
		propertyData
	);
	if (!result.success) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: true,
			message: "Validation failed",
			errors: result.errors,
		});
	}

	const zodPropertyData = result.data;

	const client = await pool.connect();
	try {
		// input property data into DB

		// if there are conflicting names in DB
		// return res.status(StatusCodes.CONFLICT).json({
		//     "error": true,
		//     "message": "You already have a property with this name at the same address"
		// })

		await client.query("BEGIN");

		await client.query("COMMIT");

		return res.status(StatusCodes.SUCCESS).json({
			error: false,
			message: "Property Created",
			data: result.data,
		});
	} catch (error) {
		await client.query("ROLLBACK");
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: true,
			message: "internal server error, could not fetch user Properties",
		});
	} finally {
		client.release();
	}
};

export const deleteUserProperty = (
	req: Request<{ propertyId: string }, {}, {}, {}>,
	res: Response
) => {
	try {
		// TODO: Validate user permission / authenticate user token

		// 1. Validate property Id
		const { propertyId } = req.params;
		const result = validateUUID(propertyId);

		if (!result.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: true,
				message: "Invalid property Id",
			});
		}

		// 2. Query DB to delete property

		// Placeholder for actual query logic
		const query = true;
		// 3. Respond based on if any rows were affect
		if (query) {
			return res.status(StatusCodes.SUCCESS).json({
				error: false,
				message: "Successfully deleted property",
			});
		}

		return res.status(StatusCodes.NOT_FOUND).json({
			error: true,
			message: "Property doesn't exist",
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: true,
			message: "Internal server error, could not delete property",
		});
	}
};

export const patchPropertyData = (
	req: Request<{ propertyId: string }, {}, API.PATCHPropertyData>,
	res: Response
) => {
	try {
		const propertyInfo = req.body;

		const { propertyId } = req.params;

		const propertyInfoResult = validatePropertyInfo(propertyInfo, true);
		const propertyIdResult = validateUUID(propertyId);

		// validate property info data
		if (!propertyInfoResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: true,
				message: "Validation failed",
				errors: propertyInfoResult.errors,
			});
		}

		// validate property Id
		if (!propertyIdResult.success) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: true, message: "Invalid property Id" });
		}

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
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: true,
			message: "internal server error, could not update Property info",
		});
	}
};
