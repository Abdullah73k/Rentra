import { pool } from "../configs/pg.config.js";
import * as DB from "../types/db.types.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";

type InsertIntoTable = {
	table: DB.DatabaseTables;
	columns: string;
	queryPlaceholders: string;
	values: any[];
};

type QueryConfig = {
	table: DB.DatabaseTables;
	id: string;
	idName: DB.Ids;
};

export async function executeDataBaseOperation<T>(
	dataBaseFn: () => T,
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

export async function insertIntoTable<T extends DB.TableObjects>({
	table,
	columns,
	queryPlaceholders,
	values,
}: InsertIntoTable) {
	const query = await pool.query<T>({
		text: `
                INSERT INTO ${table} (${columns})
                VALUES (${queryPlaceholders})
                RETURNING *
                `,
		values: values,
	});

	return query.rows[0];
}

// TODO: must add validation in repo for table and idName cuz sql injection
export async function getRowsFromTableWithId<T extends DB.TableObjects>({
	table,
	id,
	idName,
}: QueryConfig) {
	const query = await pool.query<T>({
		text: `SELECT * FROM ${table} WHERE ${idName} = $1`,
		values: [id],
	});

	return query.rows;
}
// TODO: must add validation in repo for table and idName cuz sql injection
export async function deleteRowFromTableWithId({
	table,
	id,
	idName,
}: QueryConfig) {
	const query = await pool.query({
		text: `DELETE FROM ${table} WHERE ${idName} = $1`,
		values: [id],
	});

	return query;
}
