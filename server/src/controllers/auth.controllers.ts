import { Router, type Request, type Response } from "express";
import { validateUUID } from "../utils/validation.utils.js";
import { StatusCodes } from "../constants/statusCodes.js";

export const userProperties = (req: Request<{ userId: string }>, res: Response) => {
    try {
        const result = validateUUID(req.params.userId)

        // checking if userId is a valid UUID
        if (!result.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: "Invalid user Id" })
        }

        const userId = result.data
        console.log(userId);

        // get user properties from db using userId

        // if Id in valid
        return res.status(200).json({
            error: false,
            message: "successfuly fetched user properties",
            data: ["array of properties from db"]
        })

        // if userId is in valid
        // return res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: "Invalid user Id" })

    } catch (error) {
        return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "internal server error" });
    }
}