import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { StatusCodes } from "../../constants/statusCodes.constants.js";
import { propertyData, propertyInfoData } from "../data/db-tables.data.js";

const userId = "d8ef0ed9-451e-4c81-a043-bd0495e67c2e";
const propertyId = "83dcbc74-53d6-4d7c-93a0-f9b9733f3173";

describe("Property API Endpoints", () => {
	describe("GET /api/properties/all/:userId ", () => {
		it(`Success: should return 200 status code and return all user properties`, async () => {
			const res = await request(app).get(`/api/properties/all/${userId}`);

			expect(res.statusCode).toBe(StatusCodes.SUCCESS);
		});

		it(`Failed: should return 400 status code and return a validation error for invalid UUID user id`, async () => {
			const res = await request(app).get(`/api/properties/all/invalid-user-id`);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});

	// describe("POST /api/properties/create ", () => {
	// 	const payload = {
	// 		property: {
	// 			...propertyData({
	// 				userId: userId,
	// 			}),
	// 		},
	// 		propertyInfo: {
	// 			...propertyInfoData(),
	// 		},
	// 	};

	// 	it(`Success: should return 200 status code, insert and return the inserted property`, async () => {
	// 		const res = await request(app).post(`/api/properties/create`).send(payload);

	// 		expect(res.statusCode).toBe(StatusCodes.SUCCESS);
	// 	});

	// 	it(`Failed: should return 400 status code and return a validation error for invalid payload`, async () => {
	// 		const res = await request(app).post(`/api/properties/create`).send(payload);

	// 		expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
	// 	});
	// });

	describe("GET /api/properties/:propertyId ", () => {
		it(`Success: should return 200 status code and return the requested property data`, async () => {
			const res = await request(app).get(`/api/properties/${propertyId}`);

			expect(res.statusCode).toBe(StatusCodes.SUCCESS);
		});

		it(`Failed: should return 400 status code and return a validation error for invalid UUID property id`, async () => {
			const res = await request(app).get(`/api/properties/invalid-property-id`);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});

	describe("DELETE /api/properties/delete/:propertyId ", () => {
		it(`Success: should return 200 status code and delete the property`, async () => {
			const res = await request(app).delete(
				`/api/properties/delete/${propertyId}`
			);

			expect(res.statusCode).toBe(StatusCodes.SUCCESS);
		});

		it(`Failed: should return 400 status code and return a validation error for invalid UUID property id`, async () => {
			const res = await request(app).delete(
				`/api/properties/delete/invalid-property-id`
			);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});

	// describe("PATCH /api/properties/update/:propertyId ", () => {
	// 	const payload = {};

	// 	it(`Success: should return 200 status code and update the property`, async () => {
	// 		const res = await request(app)
	// 			.patch(`/api/properties/update/${propertyId}`)
	// 			.send(payload);

	// 		expect(res.statusCode).toBe(StatusCodes.SUCCESS);
	// 	});

	// 	it(`Failed: should return 400 status code and return a validation error for invalid UUID property id`, async () => {
	// 		const res = await request(app)
	// 			.patch(`/api/properties/update/invalid-property-id`)
	// 			.send(payload);

	// 		expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
	// 	});
	// });
});
