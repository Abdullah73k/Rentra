import type { Request, Response } from "express";
import { StatusCodes } from "../constants/statusCodes.js";
import { validateUUID, validatePropertyInfo, type PropertyInfo } from "../utils/validation.utils.js";
import { type ZodIssue } from "zod";

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

export const postUserPropertyData = (req: Request<{}, {}, PropertyInfo>, res: Response) => {
    try {
        const result = validatePropertyInfo(req.body)

        if (!result.success) {
            const formatted = result.error.issues.map((issue: ZodIssue) => ({
                feild: issue.path.join("."),  // e.g. "property.userId"
                message: issue.message,      // e.g. "Invalid UUID"
            }));
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    error: true, message: "Validation failed", errors: formatted
                })
        }

        // input property data into DB

        // if there are conflicting names in DB
        // return res.status(StatusCodes.CONFLICT).json({
        //     "error": true,
        //     "message": "You already have a property with this name at the same address"
        // })

        return res.status(StatusCodes.SUCCESS).json({
            error: false,
            message: "Propery Created",
            data: result.data
        })


    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: true, message: "internal server error, could not fetch user Properties" });
    }
}