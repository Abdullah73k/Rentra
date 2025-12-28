import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth.js";
import type { RequestHandler } from "express";
import { StatusCodes } from "../constants/status-codes.constants.js";

export const authenticate: RequestHandler = async (req, res, next) => {

	const headers = req.headers;

	const session = await auth.api.getSession({
		headers: fromNodeHeaders(headers),
	});

	if (!session) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			error: true,
			message: "Unauthorized",
		});
	}

	req.user = session.user;
	next();
};
