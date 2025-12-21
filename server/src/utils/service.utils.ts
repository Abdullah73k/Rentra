import { DBError } from "../errors/db.errors.js";
import { ValidationError } from "../errors/validation.errors.js";
import { pool } from "../db/configs/drizzle.config.js";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import type { ExtractTablesWithRelations } from "drizzle-orm";

export type PoolClient = PgTransaction<
	NodePgQueryResultHKT,
	Record<string, never>,
	ExtractTablesWithRelations<Record<string, never>>
>;

export async function queryInTransaction<T, U>(
	queryFn: (data: T, client: PoolClient) => Promise<U>,
	data: T,
	errMsg: string
) {
	try {
		return await pool.transaction(async (txn) => {
			const result = await queryFn(data, txn);
			return result;
		});
	} catch (error) {
		console.log("DB transaction unknown error: ", error);
		if (error instanceof DBError) {
			console.error(error.message, error);
			throw new DBError(error.statusCode, errMsg, error);
		}
		if (error instanceof ValidationError) {
			console.error(error.message, error);
			throw new ValidationError(error.message);
		}
		throw Error("Unknown server error, query transaction failed");
	}
}
