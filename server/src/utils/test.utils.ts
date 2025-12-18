import { expect, it } from "vitest";
import * as API from "../types/api.types.js";
import type { validatePropertyData } from "./validation.utils.js";

export type ValidatePropertyDataReturn = ReturnType<
	typeof validatePropertyData
>;

const patchOptional = (field: string) =>
	["parking", "notes", "phone"].includes(field);
const postOptional = (field: string) =>
	["parking", "notes", "propertyId", "phone", "tenantId"].includes(field);

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
			const optionals = patch ? patchOptional(key) : postOptional(key);
			it(`should ${optionals ? "pass" : "fail"} when ${
				optionals ? "optional" : "required"
			} field '${String(key)}' from '${String(
				field
			)}' object is missing`, () => {
				const data = dataBuilder();
				const subObject = data[field] as Object;
				delete subObject[key];

				const result = fnToTest(data, patch);

				expect(result.success).toBe(optionals);
			});
		});
	});
};
