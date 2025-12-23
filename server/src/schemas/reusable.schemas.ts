import { z } from "zod";

export const ReusableTypes = {
	uuid: z.uuid("Invalid UUID"),
	decimal: z
		.string()
		.regex(
			/^\d{1,10}(\.\d{1,2})?$/,
			"Invalid decimal format (max 10 digits, 2 decimals)"
		),
	date: z.iso.date(),
	positiveInt2: z.number().int().min(0).max(32767),
	stringArray: z.array(z.string()),
	optionalString: z.string().optional(),
	dayOfMonth: z.number().int().min(1).max(31),
	currency: z.string().length(3).uppercase(),
};
