import { success, z, type ZodIssue } from "zod"
import { propertyInfoValidationSchema } from "../schemas/propertyInfo.schemas.js"
import { da } from "zod/locales"

export type PropertyInfo = z.infer<typeof propertyInfoValidationSchema>

export function validateUUID(userId: string) {
    const schema = z.uuid()
    const result = schema.safeParse(userId)
    return result
}
export function validatePropertyInfo(data: PropertyInfo) {
    const result = propertyInfoValidationSchema.safeParse(data)
    if (!result.success) {
        const formatted = result.error.issues.map((issue: ZodIssue) => ({
            feild: issue.path.join("."),  // e.g. "property.userId"
            message: issue.message,      // e.g. "Invalid UUID"
        }));
        const errorObj: {success: false, errors: typeof formatted} = {success: false, errors: formatted}
        return errorObj
    }
    const validatedData: {success: true, data: PropertyInfo} = {
        success: true,
        data: result.data
    }
    return validatedData
}