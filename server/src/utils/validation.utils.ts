import { z } from "zod"

export function validateUUID(userId: string) {
    const schema = z.uuid()
    const result = schema.safeParse(userId)
    return result
}