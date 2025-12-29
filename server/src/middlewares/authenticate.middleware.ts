import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth.js";
import type { RequestHandler } from "express";
import { StatusCodes } from "../constants/status-codes.constants.js";

export const authenticate: RequestHandler = async (req, res, next) => {
	console.log("DEBUG: Authenticate Middleware Hit");
	try {
		const headers = req.headers;
		console.log("DEBUG: calling fromNodeHeaders");
		const nodeHeaders = fromNodeHeaders(headers);

		console.log("DEBUG: calling auth.api.getSession");
		const response = await auth.api.getSession({
			headers: nodeHeaders,
		});
		console.log(
			"DEBUG: session retrieved",
			response ? "Session Found" : "No Session"
		);

		if (!response?.user || !response) {
			console.log("DEBUG: returning 401");
			return res.status(StatusCodes.UNAUTHORIZED).json({
				error: true,
				message: "Unauthorized",
			});
		}

		(req as any).user = response.user;
		(req as any).session = response.session;
		console.log("DEBUG: calling next()");
		next();
	} catch (error) {
		console.error("Auth Middleware Error: ", error);

		return res.status(StatusCodes.UNAUTHORIZED).json({
			error: true,
			message: "Unauthorized",
		});
	}
};
