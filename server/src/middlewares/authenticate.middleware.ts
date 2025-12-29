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

		req.user = session.user;
		console.log("DEBUG: calling next()");
		next();
	} catch (error) {
		console.error("DEBUG: CATCH BLOCK ENTERED");
		// Try to log useful info about the weird error object 
		console.error("Error type:", typeof error);
		console.error("Is generic object?", error instanceof Object);
		try {
			console.error("JSON Stringify:", JSON.stringify(error, null, 2));
		} catch (e) {
			console.error("Stringify failed");
		}
		next(error);
	}
};
