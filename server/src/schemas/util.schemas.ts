import z from "zod";

export const option = z.enum(["loan", "lease", "tenant"]);