import { z } from "zod"
import { propertyInfoValidationSchema } from "../schemas/propertyInfo.schemas.js"

export type PropertyInfo = z.infer<typeof propertyInfoValidationSchema>

export function validateUUID(userId: string) {
    const schema = z.uuid()
    const result = schema.safeParse(userId)
    return result
}
export function validatePropertyInfo(data: PropertyInfo) {
    const result = propertyInfoValidationSchema.safeParse(data)
    return result
}