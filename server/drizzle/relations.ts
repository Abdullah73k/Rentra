import { relations } from "drizzle-orm/relations";
import { user, property, propertyInfo, loan, tenant, documents, session, lease, account, transaction, passkey, twoFactor } from "./schema";

export const propertyRelations = relations(property, ({one, many}) => ({
	user: one(user, {
		fields: [property.userId],
		references: [user.id]
	}),
	propertyInfos: many(propertyInfo),
	loans: many(loan),
	tenants: many(tenant),
	documents: many(documents),
	leases: many(lease),
	transactions: many(transaction),
}));

export const userRelations = relations(user, ({many}) => ({
	properties: many(property),
	sessions: many(session),
	accounts: many(account),
	passkeys: many(passkey),
	twoFactors: many(twoFactor),
}));

export const propertyInfoRelations = relations(propertyInfo, ({one}) => ({
	property: one(property, {
		fields: [propertyInfo.propertyId],
		references: [property.id]
	}),
}));

export const loanRelations = relations(loan, ({one}) => ({
	property: one(property, {
		fields: [loan.propertyId],
		references: [property.id]
	}),
}));

export const tenantRelations = relations(tenant, ({one, many}) => ({
	property: one(property, {
		fields: [tenant.propertyId],
		references: [property.id]
	}),
	documents: many(documents),
	leases: many(lease),
}));

export const documentsRelations = relations(documents, ({one}) => ({
	property: one(property, {
		fields: [documents.propertyId],
		references: [property.id]
	}),
	tenant: one(tenant, {
		fields: [documents.tenantId],
		references: [tenant.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const leaseRelations = relations(lease, ({one, many}) => ({
	property: one(property, {
		fields: [lease.propertyId],
		references: [property.id]
	}),
	tenant: one(tenant, {
		fields: [lease.tenantId],
		references: [tenant.id]
	}),
	transactions: many(transaction),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const transactionRelations = relations(transaction, ({one}) => ({
	lease: one(lease, {
		fields: [transaction.leaseId],
		references: [lease.id]
	}),
	property: one(property, {
		fields: [transaction.propertyId],
		references: [property.id]
	}),
}));

export const passkeyRelations = relations(passkey, ({one}) => ({
	user: one(user, {
		fields: [passkey.userId],
		references: [user.id]
	}),
}));

export const twoFactorRelations = relations(twoFactor, ({one}) => ({
	user: one(user, {
		fields: [twoFactor.userId],
		references: [user.id]
	}),
}));