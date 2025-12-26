import * as DB from "../types/db.types.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { dbConnection } from "./db-connects.utils.js";
import type { PoolClient } from "../utils/service.utils.js";
import type { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, type InferInsertModel } from "drizzle-orm";
import { property } from "../db/schemas/property.db.js";
import { propertyInfo } from "../db/schemas/property-info.db.js";
import { loan } from "../db/schemas/loan.db.js";
import { lease } from "../db/schemas/lease.db.js";
import { tenant } from "../db/schemas/tenant.db.js";
import { transaction } from "../db/schemas/transaction.db.js";
import { documents } from "../db/schemas/document.db.js";

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
	async property(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(property).where(eq(property.userId, id));
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
	async document(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(documents)
			.where(eq(documents.propertyId, id));
	},
};

export async function deleteRowFromTableWithId<
	T extends PgTableWithColumns<any>
>(table: T, id: string, client: PoolClient | undefined) {
	const pool = dbConnection(client);
	const query = await pool.delete(table).where(eq(table.id, id));
	return query;
}

export const updateRowFromTableWithId = {
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
