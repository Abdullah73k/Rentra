import type { Request, Response } from "express";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { validateUUID } from "../utils/validation.utils.js";

export const putUserAvatar = async (req: Request, res: Response) => {
	const userId = req.user?.id;

	const result = validateUUID(userId);
};
