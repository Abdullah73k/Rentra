import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { StatusCodes } from "../../constants/statusCodes.constants.js";

const userId = "d8ef0ed9-451e-4c81-a043-bd0495e67c2e";

describe("Property API Endpoints", () => {
	describe("GET /api/properties/all/:userId ", () => {
		it(`Success should return 200 status code and return all user properties`, async () => {
			const res = await request(app).get(`/api/properties/all/${userId}`);

			expect(res.statusCode).toBe(StatusCodes.SUCCESS);
		});

		it(`Success should return 400 status code and return an validation error for invalid UUID user id`, async () => {
			const res = await request(app).get(`/api/properties/all/invalid-user-id`);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});

		// it(`Success should return 400 status code and return an validation error for invalid UUID user id`, async () => {
		// 	const res = await request(app).get(`/api/properties/all/invalid-user-id`);

		// 	expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		// });
	});
});
