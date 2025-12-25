import type { RequestHandler } from "express";

export const asyncHandler = <T, U, K, B>(
	fn: RequestHandler<T, U, K, B>
): RequestHandler<T, U, K, B> => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
