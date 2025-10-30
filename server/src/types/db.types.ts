import type z from "zod";
import { patchPropertyInfoValidationSchema, postPropertyInfoValidationSchema, propertySchema } from "../schemas/propertyInfo.schemas.js";

export type Property = z.output<typeof propertySchema>;

export type ZodPostPropertyInfo = z.output<typeof postPropertyInfoValidationSchema>
export type ZodPatchPropertyInfo = z.output<typeof patchPropertyInfoValidationSchema>