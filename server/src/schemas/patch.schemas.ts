import z from "zod";
import * as POST from "./post.schemas.js";
import { ReusableTypes } from "./reusable.schemas.js";

export const propertySchema = POST.propertySchema.extend({
	id: ReusableTypes.uuid,
});

export const propertyInfoSchema = POST.propertyInfoSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
});

export const documentSchema = POST.documentSchema.extend({
	id: ReusableTypes.uuid,
});

const loanSchema = POST.loanSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
});

const tenantSchema = POST.tenantSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
});

const leaseSchema = POST.leaseSchema.extend({
	id: ReusableTypes.uuid,
	propertyId: ReusableTypes.uuid,
	tenantId: ReusableTypes.uuid,
});

export const transactionSchema = POST.transactionSchema.extend({
	id: ReusableTypes.uuid,
});

export const propertyDataSchema = z
	.object({
		property: propertySchema,
		propertyInfo: propertyInfoSchema,
		loan: loanSchema,
		tenant: tenantSchema,
		lease: leaseSchema,
	})
	.partial();
