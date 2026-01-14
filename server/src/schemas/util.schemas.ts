import z from "zod";

export const option = z.enum(["loan", "lease", "tenant"]);

export const docTypeSchema = z.enum(["photo", "document"]);

export const privateDocsLabel = z.enum(["leaseDocs", "loanDocs", "tenantDocs", "propertyDocs"]);

export const propertyPrivateDocsSchema = z
	.object({
		leaseId: z.uuid().optional(),
		loanId: z.uuid().optional(),
		tenantId: z.uuid().optional(),
		propertyId: z.uuid(),
		label: privateDocsLabel,
		type: docTypeSchema.optional(),
	})
	.refine(
		(data) => {
			const ids = [
				data.leaseId,
				data.loanId,
				data.tenantId,
				data.propertyId,
			].filter((id) => id !== undefined);
			return ids.length >= 1 && ids.length <= 2 && ids.includes(data.propertyId);
		},
		{
			message:
				"Exactly one of propertyId, leaseId, loanId, or tenantId must be provided, and the others must be undefined.",
			path: ["leaseId", "loanId", "tenantId", "propertyId"],
		}
	);
