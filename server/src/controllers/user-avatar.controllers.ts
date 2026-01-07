import type { Request, Response } from "express";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { validateUUID } from "../utils/validation.utils.js";
import { ValidationError } from "../errors/validation.errors.js";
import { UserService } from "../services/user.services.js";

export const patchUserAvatar = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const avatar = req.file;

	const result = validateUUID(userId);

	if (!result.success) throw new ValidationError("Invalid userId");
	if (!avatar) throw new ValidationError("Avatar is required");

	const response = await UserService.updateAvatar({
		userId: result.data,
		avatar,
	});

	return res.status(StatusCodes.SUCCESS).json({
		error: false,
		message: "Successfully updated avatar",
		data: response,
	});
};
