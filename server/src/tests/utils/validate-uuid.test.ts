import { expect, describe, it } from "vitest";
import { validateUUID } from "../../utils/validation.utils.js";


describe("validateUUID", () => {
	// Case 1: Testing the Valid Input
	it("should return success: true for a valid UUID", () => {
		const validId = "550e8400-e29b-41d4-a716-446655440000";

		const result = validateUUID(validId);

		expect(result.success).toBe(true);

		if (result.success) {
			expect(result.data).toBe(validId);
		}
	});

	// Case 2: Testing the Invalid Input
	it("should return success: false for an invalid string", () => {
		const invalidId = "not-a-valid-uuid";

		const result = validateUUID(invalidId);

		expect(result.success).toBe(false);
	});

	// Case 3: Testing Edge Case (Empty String)
	it("should return success: false for an empty string", () => {
		const result = validateUUID("");
		expect(result.success).toBe(false);
	});
});
