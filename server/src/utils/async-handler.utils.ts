import type { RequestHandler } from "express";

export const asyncHandler = <T>(fn: RequestHandler<T>): RequestHandler<T> => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
