import type { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes.js";
import { validateUUID } from "../utils/validation.utils.js";

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
				message: "Property ID should be a valid UUID",
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
