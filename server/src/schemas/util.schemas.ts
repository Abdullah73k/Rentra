import z from "zod";

export const option = z.enum(["loan", "lease", "tenant"]);

export const docTypeSchema = z.enum(["photo", "document"]);

export const privateDocsLabel = z.enum(["leaseDocs", "loanDocs", "tenantDocs"]);

export const propertyPrivateDocsSchema = z
	.object({
		leaseId: z.uuid().optional(),
		loanId: z.uuid().optional(),
		tenantId: z.uuid().optional(),
		propertyId: z.uuid().optional(),
		label: privateDocsLabel,
		type: docTypeSchema.optional(),
	})
	.refine(
		(data) => {
			const ids = [data.leaseId, data.loanId, data.tenantId].filter(
				(id) => id !== undefined
			);
			return ids.length === 1;
		},
		{
			message:
				"Exactly one of leaseId, loanId, or tenantId must be provided, and the others must be undefined.",
			path: ["leaseId", "loanId", "tenantId"],
		}
	);
