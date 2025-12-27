import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { StatusCodes } from "../../constants/status-codes.constants.js";
import { transactionData } from "../data/db-tables.data.js";

const userId = "d8ef0ed9-451e-4c81-a043-bd0495e67c2e";
const transactionId = "0cda9408-9dbe-449e-8c54-4740e74f07e5";
const propertyId = "83dcbc74-53d6-4d7c-93a0-f9b9733f3173";

describe("Transaction API Endpoints", () => {
	describe("POST /api/properties/create/transaction", () => {
		it("Success: should return 201 status code and create the transaction", async () => {
			const payload = {
				transactionDetails: transactionData({
					propertyId: propertyId,
				}),
			};

			const res = await request(app)
				.post("/api/properties/create/transaction")
				.send(payload);

			expect(res.statusCode).toBe(StatusCodes.CREATED);
			expect(res.body.error).toBe(false);
		});

		it("Failed: should return 400 status code for invalid payload", async () => {
			const payload = {
				transactionDetails: {},
			};

			const res = await request(app)
				.post("/api/properties/create/transaction")
				.send(payload);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});

	describe("DELETE /api/properties/delete/transaction/:transactionId", () => {
		it("Success: should return 200 status code and delete the transaction", async () => {
			const res = await request(app).delete(
				`/api/properties/delete/transaction/${transactionId}`
			);

			expect(res.statusCode).toBe(StatusCodes.SUCCESS);
		});

		it("Failed: should return 400 status code for invalid UUID transaction id", async () => {
			const res = await request(app).delete(
				"/api/properties/delete/transaction/invalid-transaction-id"
			);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});

	describe("PATCH /api/properties/update/transaction/:transactionId", () => {
		it("Success: should return 200 status code and update the transaction", async () => {
			const payload = transactionData({
				propertyId: propertyId,
				amount: "500.00",
			});

			const res = await request(app)
				.patch(`/api/properties/update/transaction/${transactionId}`)
				.send(payload);

			expect(res.statusCode).toBe(StatusCodes.SUCCESS);
		});

		it("Failed: should return 400 status code for invalid UUID transaction id", async () => {
			const payload = transactionData({
				propertyId: propertyId,
			});

			const res = await request(app)
				.patch("/api/properties/update/transaction/invalid-transaction-id")
				.send(payload);

			expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
		});
	});
});
