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

export const getUserProperties = (
    req: Request<{ userId: string }>,
    res: Response
) => {
    try {
        const result = validateUUID(req.params.userId);

        // checking if userId is a valid UUID
        if (!result.success) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: true, message: "Invalid user Id" });
        }

        const userId = result.data;
        console.log(userId);

        // get user properties from db using userId

        // if Id in valid
        return res.status(StatusCodes.SUCCESS).json({
            error: false,
            message: "successfully fetched user properties",
            data: ["array of properties from db"],
        });

        // if userId is invalid
        // return res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: "Invalid user Id" })
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: true, message: "internal server error, could not fetch user Properties" });
    }
};

export const postUserPropertyData = (req: Request, res: Response) => {
    try {

    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: true, message: "internal server error, could not fetch user Properties" });
    }
}