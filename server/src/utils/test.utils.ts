import { expect, it } from "vitest";
import * as API from "../types/api.types.js";
import type { validatePropertyData } from "./validation.utils.js";

export type ValidatePropertyDataReturn = ReturnType<
	typeof validatePropertyData
>;

export const testMissingObjectKey = <
	U extends API.POSTPropertyData | API.PATCHPropertyData
>(
	dataBuilder: () => U,
	fnToTest: (data: U, patch: boolean) => ValidatePropertyDataReturn,
	patch: boolean = false
) => {
	const data = dataBuilder();
	const fields = Object.keys(data) as Array<keyof U>;

	fields.forEach((field) => {
		const subObject = data[field] as Object;

		const keys = Object.keys(subObject) as Array<keyof typeof subObject>;

		keys.forEach((key) => {
			it(`should fail when required field '${String(key)}' from '${String(
				field
			)}' object is missing`, () => {
				delete subObject[key];

				const result = fnToTest(data, patch);
				expect(result.success).toBe(false);
			});
		});
	});
};
