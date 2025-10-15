import { propertyInfoValidationSchema, optionalPropertyInfoValidationSchema } from "../schemas/propertyInfo.schemas.js"
import { success, z, type ZodIssue } from "zod"
import { da } from "zod/locales"

export type PropertyInfo = z.infer<typeof propertyInfoValidationSchema>
export type PatchPropertyInfo = z.infer<typeof optionalPropertyInfoValidationSchema>

export function validateUUID(userId: string) {
  const schema = z.uuid()
  const result = schema.safeParse(userId)
  return result
}
export function validatePropertyInfo<T extends PropertyInfo | PatchPropertyInfo>(data: T, patch: boolean = false) {
  const schema = patch ? optionalPropertyInfoValidationSchema : propertyInfoValidationSchema;
  const result  = schema.safeParse(data)
  

  if (!result.success) {
    const formatted = result.error.issues.map((issue: ZodIssue) => ({
      feild: issue.path.join("."),  // e.g. "property.userId"
      message: issue.message,      // e.g. "Invalid UUID"
    }));
    const errorObj: { success: false, errors: typeof formatted } = { success: false, errors: formatted }
    return errorObj
  }
  const validatedData: { success: true, data: T } = {
    success: true,
    data: result.data as T
  }
  return validatedData
}

export function pruneUndefined<T>(obj: T): Partial<T> {
  // If obj is null, undefined, or not an object return as is
  if (obj == null || typeof obj !== "object") return obj as any;

  // If obj is an array, apply pruneUndefined() to each element
  if (Array.isArray(obj)) {
    return obj.map(pruneUndefined) as any;
  }

  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .flatMap(([k, v]) => {
        // If the value is undefined, drop this key by returning []
        if (v === undefined) return [];

        // If the value is another object, recursively clean it.
        const cleaned =
          typeof v === "object" && v !== null ? pruneUndefined(v) : v;
        return [[k, cleaned]];
      })
  ) as Partial<T>;
}

