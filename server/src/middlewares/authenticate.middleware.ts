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
		const session = await auth.api.getSession({
			headers: nodeHeaders,
		});
		console.log(
			"DEBUG: session retrieved",
			session ? "Session Found" : "No Session"
		);

		if (!session) {
			console.log("DEBUG: returning 401");
			return res.status(StatusCodes.UNAUTHORIZED).json({
				error: true,
				message: "Unauthorized",
			});
		}

		(req as any).user = session.user;
		(req as any).session = session.session;
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
