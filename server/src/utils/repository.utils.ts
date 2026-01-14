import * as DB from "../types/db.types.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { dbConnection } from "./db-connects.utils.js";
import type { PoolClient } from "../utils/service.utils.js";
import type { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, inArray, type InferInsertModel, and, isNull } from "drizzle-orm";
import { property } from "../db/schemas/property.db.js";
import { propertyInfo } from "../db/schemas/property-info.db.js";
import { loan } from "../db/schemas/loan.db.js";
import { lease } from "../db/schemas/lease.db.js";
import { tenant } from "../db/schemas/tenant.db.js";
import { transaction } from "../db/schemas/transaction.db.js";
import { documents } from "../db/schemas/document.db.js";
import { user } from "../db/schemas/auth-schema.db.js";

export async function executeDataBaseOperation<T>(
	dataBaseFn: () => Promise<T>,
	statusCode: StatusCodes,
	message: string
) {
	try {
		const query = await dataBaseFn();
		return query;
	} catch (error) {
		throw new DBError(statusCode, message, error);
	}
}

export async function insertIntoTable<T extends PgTable>(
	table: T,
	data: InferInsertModel<T>,
	client: PoolClient | undefined
) {
	const pool = dbConnection(client);
	const query = await pool.insert(table).values(data).returning();
	return query;
}

export const getRowsFromTableWithId = {
	async property({
		userId,
		propertyId,
		client,
	}: { client: PoolClient | undefined } & (
		| { userId: string; propertyId?: never }
		| { propertyId: string; userId?: never }
	)) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(property)
			.where(eq(userId ? property.userId : property.id, userId ?? propertyId));
	},
	async propertyInfo(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(propertyInfo)
			.where(eq(propertyInfo.propertyId, id));
	},
	async loan(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(loan).where(eq(loan.propertyId, id));
	},
	async lease(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(lease).where(eq(lease.propertyId, id));
	},
	async tenant(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(tenant).where(eq(tenant.propertyId, id));
	},
	async transaction(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(transaction)
			.where(eq(transaction.propertyId, id));
	},
	async document({
		client,
		propertyId,
		documentId,
	}: { client: PoolClient | undefined } & (
		| { propertyId: string; documentId?: never }
		| { propertyId?: never; documentId: string }
	)) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(documents)
			.where(
				eq(
					propertyId ? documents.propertyId : documents.id,
					(propertyId ?? documentId)!
				)
			);
	},
	async documentsPath(ids: string[], client: PoolClient | undefined) {
		const pool = dbConnection();
		const paths = await pool
			.select({ path: documents.path })
			.from(documents)
			.where(inArray(documents.id, ids));

		return paths.map((p) => p.path);
	},
	async propertyDocs(propertyId: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(documents)
			.where(
				and(
					eq(documents.propertyId, propertyId),
					isNull(documents.loanId),
					isNull(documents.leaseId),
					isNull(documents.tenantId)
				)
			);
	},
	async loanDocs(loanId: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(documents)
			.where(eq(documents.loanId, loanId));
	},
	async leaseDocs(leaseId: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(documents)
			.where(eq(documents.leaseId, leaseId));
	},
	async tenantDocs(tenantId: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(documents)
			.where(eq(documents.tenantId, tenantId));
	},
};

export async function deleteRowFromTableWithId<
	T extends PgTableWithColumns<any>
>(table: T, id: string, client: PoolClient | undefined) {
	const pool = dbConnection(client);
	const query = await pool.delete(table).where(eq(table.id, id));
	return query;
}

export async function deleteDocumentsFromTable(
	ids: string[],
	client: PoolClient | undefined
) {
	const pool = dbConnection(client);
	const query = await pool.delete(documents).where(inArray(documents.id, ids));
	return query;
}

export const updateRowFromTableWithId = {
	async user(id: string, avatar: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.update(user)
			.set({ image: avatar })
			.where(eq(user.id, id))
			.returning();
	},
	async property(
		id: string,
		values: DB.Property,
		client: PoolClient | undefined
	) {
		const pool = dbConnection(client);
		return await pool
			.update(property)
			.set(values)
			.where(eq(property.id, id))
			.returning();
	},
	async propertyInfo(
		id: string,
		values: DB.PropertyInfo,
		client: PoolClient | undefined
	) {
		const pool = dbConnection(client);
		return await pool
			.update(propertyInfo)
			.set(values)
			.where(eq(propertyInfo.propertyId, id))
			.returning();
	},
	async loan(id: string, values: DB.Loan, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.update(loan)
			.set(values)
			.where(eq(loan.propertyId, id))
			.returning();
	},
	async lease(id: string, values: DB.Lease, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.update(lease)
			.set(values)
			.where(eq(lease.propertyId, id))
			.returning();
	},
	async tenant(id: string, values: DB.Tenant, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.update(tenant)
			.set(values)
			.where(eq(tenant.propertyId, id))
			.returning();
	},
	async transaction(
		id: string,
		values: DB.Transaction,
		client: PoolClient | undefined
	) {
		const pool = dbConnection(client);
		return await pool
			.update(transaction)
			.set(values)
			.where(eq(transaction.id, id))
			.returning();
	},
	async document(
		id: string,
		values: DB.Document,
		client: PoolClient | undefined
	) {
		const pool = dbConnection(client);
		return await pool
			.update(documents)
			.set(values)
			.where(eq(documents.propertyId, id))
			.returning();
	},
};
