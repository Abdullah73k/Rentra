import * as DB from "../types/db.types.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import { dbConnection } from "./db-connects.utils.js";
import type { PoolClient } from "../utils/service.utils.js";
import type { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, type InferInsertModel } from "drizzle-orm";
import type { property } from "../db/schemas/property.db.js";
import type { propertyInfo } from "../db/schemas/property-info.db.js";
import type { loan } from "../db/schemas/loan.db.js";
import type { lease } from "../db/schemas/lease.db.js";
import type { tenant } from "../db/schemas/tenant.db.js";
import type { transaction } from "../db/schemas/transaction.db.js";

// TODO: Add undefined type union for get db operation

type InferSelect =
	| typeof property.$inferSelect
	| typeof propertyInfo.$inferSelect
	| typeof loan.$inferSelect
	| typeof lease.$inferSelect
	| typeof tenant.$inferSelect
	| typeof transaction.$inferSelect;

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

export function generateCreateQueryColsAndValues<T extends DB.TableObjects>(
	object: T
) {
	const keys = Object.keys(object);
	const columns = keys.join(", ");
	const values = Object.values(object);

	const queryPlaceholders = generateQueryPlaceholders(keys.length);

	return {
		keys,
		columns,
		values,
		queryPlaceholders,
	};
}

function generateQueryPlaceholders(length: number) {
	let placeholder = [];
	for (let i = 1; i <= length; i++) placeholder.push(i);
	const queryPlaceholders = placeholder.join(", ");

	return queryPlaceholders;
}

export async function insertIntoTable<T extends PgTable>(
	table: T,
	data: InferInsertModel<T>,
	client?: PoolClient
) {
	const pool = dbConnection(client);
	const query = await pool.insert(table).values(data).returning();
	return query;
}

export async function getRowsFromTableWithId<T extends PgTableWithColumns<any>>(
	table: T,
	id: string,
	client?: PoolClient
) {
	const pool = dbConnection(client);
	const query = await pool
		.select()
		.from(table as PgTable)
		.where(eq(table.id, id));
	return query;
}

export async function deleteRowFromTableWithId<
	T extends PgTableWithColumns<any>
>(table: T, id: string, client?: PoolClient) {
	const pool = dbConnection(client);
	const query = await pool.delete(table).where(eq(table.id, id));
	return query;
}

export async function updateRowFromTableWithId<
	T extends PgTableWithColumns<any>
>(table: T, values: DB.TableObjects, id: string, client?: PoolClient) {
	const pool = dbConnection(client);
	const query = await pool.update(table).set(values).where(eq(table.id, id));
	return query;
}
