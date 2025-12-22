import * as DB from "../types/db.types.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
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

// TODO: Add undefined type union for get db operation

type InferSelect =
	| typeof property.$inferSelect
	| typeof propertyInfo.$inferSelect
	| typeof loan.$inferSelect
	| typeof lease.$inferSelect
	| typeof tenant.$inferSelect
	| typeof transaction.$inferSelect
	| typeof documents.$inferSelect;

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
		return await pool.select().from(property).where(eq(property.id, id));
	},
	async propertyInfo(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool
			.select()
			.from(propertyInfo)
			.where(eq(propertyInfo.id, id));
	},
	async loan(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(loan).where(eq(loan.id, id));
	},
	async lease(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(lease).where(eq(lease.id, id));
	},
	async tenant(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(tenant).where(eq(tenant.id, id));
	},
	async transaction(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(transaction).where(eq(transaction.id, id));
	},
	async document(id: string, client: PoolClient | undefined) {
		const pool = dbConnection(client);
		return await pool.select().from(documents).where(eq(documents.id, id));
	},
};

export async function deleteRowFromTableWithId<
	T extends PgTableWithColumns<any>
>(table: T, id: string, client: PoolClient | undefined) {
	const pool = dbConnection(client);
	const query = await pool.delete(table).where(eq(table.id, id));
	return query;
}

export async function updateRowFromTableWithId<
	T extends PgTableWithColumns<any>
>(
	table: T,
	values: DB.TableObjects,
	id: string,
	client: PoolClient | undefined
) {
	const pool = dbConnection(client);
	const query = await pool.update(table).set(values).where(eq(table.id, id));
	return query;
}
