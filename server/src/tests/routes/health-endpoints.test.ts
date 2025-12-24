import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { StatusCodes } from "../../constants/statusCodes.constants.js";

describe("Health Check Endpoints", () => {
	describe("GET /api/ping ", () => {
		it(`Success should return 200 status code and '{ message: "pong" }'`, async () => {
			const res = await request(app).get("/api/ping");

			expect(res.statusCode).toBe(StatusCodes.SUCCESS);
			expect(res.body.message).toStrictEqual("pong");
		});
	});
});
