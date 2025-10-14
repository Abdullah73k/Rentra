import { z } from "zod"
import { propertyInfoValidationSchema, optionalPropertyInfoValidationSchema } from "../schemas/propertyInfo.schemas.js"

export type PropertyInfo = z.infer<typeof propertyInfoValidationSchema>
export type PatchPropertyInfo = z.infer<typeof optionalPropertyInfoValidationSchema>

export function validateUUID(userId: string) {
    const schema = z.uuid()
    const result = schema.safeParse(userId)
    return result
}
export function validatePropertyInfo(data: PropertyInfo) {
    const result = propertyInfoValidationSchema.safeParse(data)
    return result
}
export function validatePatchPropertyInfo(data: PatchPropertyInfo){
    const result = optionalPropertyInfoValidationSchema.safeParse(data)
    return result
}
// This function removes all keys from an object whose value is `undefined`.
// It works recursively (handles nested objects and arrays).
// It keeps valid falsy values like 0, false, or "" (they are NOT removed).

export function pruneUndefined<T>(obj: T): Partial<T> {
  // If obj is null, undefined, or not an object (i.e., number, string, etc.),
  // just return it as-is. Nothing to clean here.
  if (obj == null || typeof obj !== "object") return obj as any;

  // If obj is an array, apply pruneUndefined() to each element
  // and return the cleaned array.
  if (Array.isArray(obj)) {
    return obj.map(pruneUndefined) as any;
  }

  // If obj is a normal object (not array), clean it:
  // 1. Convert object to array of [key, value] pairs.
  // 2. Use flatMap to:
  //    - Skip keys where value === undefined
  //    - Recursively clean nested objects
  // 3. Convert the filtered pairs back into an object.
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .flatMap(([k, v]) => {
        // If the value is undefined, drop this key by returning []
        if (v === undefined) return [];

        // If the value is another object, recursively clean it.
        // Otherwise, keep it as-is.
        const cleaned =
          typeof v === "object" && v !== null ? pruneUndefined(v) : v;

        // Return this key-value pair as a single-entry array [[k, cleaned]]
        // (flatMap will flatten it into the main result)
        return [[k, cleaned]];
      })
  // Finally, cast the result back to Partial<T> because some keys were removed.
  ) as Partial<T>;
}
