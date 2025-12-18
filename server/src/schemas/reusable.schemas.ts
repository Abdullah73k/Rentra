import { z } from "zod";

export const ReusableTypes = {
	uuid: z.uuid("Invalid UUID"),
	decimal: z.number().min(0).max(9999999999.99),
	date: z.iso.date().transform((date) => new Date(date)),
	positiveInt2: z.number().int().min(0).max(32767),
	stringArray: z.array(z.string()),
	optionalString: z.string().optional(),
	currency: z.string().length(3).uppercase(),
};

