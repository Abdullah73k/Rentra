import type z from "zod";
import { propertySchema } from "../schemas/propertyInfo.schemas.js";

export type Property = z.output<typeof propertySchema>;
