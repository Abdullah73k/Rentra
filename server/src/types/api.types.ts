import type z from "zod";
import * as POST from "../schemas/post.schemas.js";
import * as PATCH from "../schemas/patch.schemas.js";
import type {
	docTypeSchema,
	privateDocsLabel,
	propertyPrivateDocsSchema,
} from "../schemas/util.schemas.js";

/**
 * This file will contain all types for the property API.
 * Types are made for data being send over HTTP through REST.
 */

// Transactions
export type POSTTransaction = z.input<typeof POST.transactionSchema>;
export type PATCHTransaction = z.input<typeof PATCH.transactionSchema>;

// Property
export type PATCHPropertyData = z.input<typeof PATCH.propertyDataSchema>;
export type POSTPropertyData = z.input<typeof POST.propertyDataSchema>;

export type PropertyPrivateDocsIds = Omit<
	z.input<typeof propertyPrivateDocsSchema>,
	"type" | "label"
>;
export type PropertyPrivateDocsLabel = {
	label: z.infer<typeof privateDocsLabel>;
};
export type PropertyPrivateDocsType = { type: z.infer<typeof docTypeSchema> };
export type PropertyPrivateDocOptions = PropertyPrivateDocsLabel &
	PropertyPrivateDocsType;
