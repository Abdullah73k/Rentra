// import { describe, it, expect } from "vitest";
// import { validatePropertyData } from "../../utils/validation.utils.js";
// import { randomUUID } from "node:crypto";
// import {
// 	leaseData,
// 	loanData,
// 	propertyData,
// 	propertyInfoData,
// 	tenantData,
// } from "../data/db-tables.data.js";
// import { testMissingObjectKey } from "../../utils/test.utils.js";
// import type {
// 	PATCHPropertyData,
// 	POSTPropertyData,
// } from "../../types/api.types.js";
// import type { DeepPartial } from "../../types/util.types.js";

// // --- Factory / Helper Function ---
// // This creates a valid "Happy Path" object by default.
// // You can override specific fields when you want to test edge cases.
// const createValidPOSTData = (overrides?: DeepPartial<POSTPropertyData>) => {
// 	const { property, propertyInfo, loan, tenant, lease, ...rest } =
// 		overrides || {};

// 	return {
// 		property: {
// 			...propertyData({
// 				...property,
// 			}),
// 		},
// 		propertyInfo: {
// 			...propertyInfoData({
// 				...propertyInfo,
// 			}),
// 		},
// 		...(loan && {
// 			loan: {
// 				...loanData({
// 					...loan,
// 				}),
// 			},
// 		}),
// 		...(tenant && {
// 			tenant: {
// 				...tenantData({
// 					...tenant,
// 				}),
// 			},
// 		}),
// 		...(lease && {
// 			lease: {
// 				...leaseData({
// 					...lease,
// 				}),
// 			},
// 		}),
// 		...rest,
// 	};
// };

// export const createValidPATCHData = (
// 	overrides?: Partial<PATCHPropertyData>
// ) => {
// 	return {
// 		property: {
// 			...propertyData({
// 				id: randomUUID(),
// 			}),
// 		},
// 		propertyInfo: {
// 			...propertyInfoData({
// 				id: randomUUID(),
// 				propertyId: randomUUID(),
// 			}),
// 		},
// 		loan: {
// 			...loanData({
// 				id: randomUUID(),
// 			}),
// 		},
// 		tenant: {
// 			...tenantData({
// 				id: randomUUID(),
// 			}),
// 		},
// 		lease: {
// 			...leaseData({
// 				id: randomUUID(),
// 			}),
// 		},
// 		...(overrides || {}),
// 	};
// };

// describe("validatePropertyData", () => {
// 	describe("patch", () => {
// 		testMissingObjectKey(
// 			() => createValidPATCHData(),
// 			validatePropertyData,
// 			true
// 		);

// 		it("should return success: false for empty patch object", () => {
// 			// We use 'as any' because we intentionally want to test invalid input
// 			// that TypeScript would normally block at compile time.
// 			const invalidPatchData = {} as any;
// 			const patch = true as const;

// 			const result = validatePropertyData(invalidPatchData, patch);

// 			expect(result.success).toBe(false);
// 			if (!result.success) {
// 				// Optional: Check that we got some errors back
// 				expect(result.errors.length).toBeGreaterThan(0);
// 			}
// 		});

// 		it("should return success: true for full valid patch object", () => {
// 			const validPatchData = createValidPATCHData();
// 			const patch = true as const;

// 			const result = validatePropertyData(validPatchData, patch);

// 			expect(result.success).toBe(true);
// 		});
// 	});

// 	describe("post", () => {

// 		testMissingObjectKey(
// 			() =>
// 				createValidPOSTData({
// 					loan: { ...loanData() },
// 					tenant: { ...tenantData() },
// 					lease: { ...leaseData() },
// 				}),
// 			validatePropertyData
// 		);

// 		it("false for empty post object", () => {
// 			const invalidPostData = {} as any;

// 			const result = validatePropertyData(invalidPostData);

// 			expect(result.success).toBe(false);
// 		});

// 		it("true for a valid object with all form fields filled out", () => {
// 			const validData = createValidPOSTData({
// 				loan: { ...loanData() },
// 				tenant: { ...tenantData() },
// 				lease: { ...leaseData() },
// 			});
// 			const result = validatePropertyData(validData);
// 			expect(result.success).toBe(true);
// 		});

// 		it("true for a valid object with only loan field not filled out", () => {
// 			const validData = createValidPOSTData({
// 				tenant: { ...tenantData() },
// 				lease: { ...leaseData() },
// 			});
// 			const result = validatePropertyData(validData);
// 			expect(result.success).toBe(true);
// 		});

// 		it("true for a valid object with only tenant field not filled out", () => {
// 			const validData = createValidPOSTData({
// 				loan: { ...loanData() },
// 				lease: { ...leaseData() },
// 			});
// 			const result = validatePropertyData(validData);
// 			expect(result.success).toBe(true);
// 		});

// 		it("true for a valid object with only lease field not filled out", () => {
// 			const validData = createValidPOSTData({
// 				loan: { ...loanData() },
// 				tenant: { ...tenantData() },
// 			});
// 			const result = validatePropertyData(validData);
// 			expect(result.success).toBe(true);
// 		});

// 		it("true for a valid object where property and propertyInfo fields are only filled out", () => {
// 			const validData = createValidPOSTData();
// 			const result = validatePropertyData(validData);
// 			expect(result.success).toBe(true);
// 		});

// 		it("should fail if userId is invalid", () => {
// 			// We use the factory but OVERRIDE just one field to "break" it
// 			const invalidData = createValidPOSTData({
// 				property: { userId: "not-a-valid-uuid" },
// 			});

// 			const result = validatePropertyData(invalidData);
// 			expect(result.success).toBe(false);
// 		});
// 	});
// });
