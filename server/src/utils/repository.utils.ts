import { pool } from "../configs/pg.config.js";
import * as DB from "../types/db.types.js";
import { DBError } from "../errors/db.errors.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import { ValidationError } from "../errors/validation.errors.js";

// TODO: Add undefined type union for get db operation

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

type UpdateQuery = {
	table: DB.DatabaseTables;
	columnsAndPlaceholders: string;
	values: any[];
	id: string;
	idName: DB.Ids;
};

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

export function buildUpdateSet(table: Record<string, any>) {
	const keys = Object.keys(table);

	// SET:  column1 = $2, column2 = $3, ...
	const setString = keys
		.map((key, index) => `${key} = $${index + 2}`)
		.join(", ");

	const values = keys.map((key) => table[key]);

	return { setString, values };
}

export async function insertIntoTable<T extends DB.TableObjects>({
	table,
	columns,
	queryPlaceholders,
	values,
}: InsertIntoTable) {
	if (!DB.DatabaseTables.includes(table))
		throw new ValidationError("Invalid table name, query unsafe");

	const query = await pool.query<T>({
		text: `
                INSERT INTO ${table} (${columns})
                VALUES (${queryPlaceholders})
                RETURNING *
                `,
		values,
	});

	return query.rows[0];
}

// TODO: must add validation in repo for table and idName cuz sql injection
export async function getRowsFromTableWithId<T extends DB.TableObjects>({
	table,
	id,
	idName,
}: QueryConfig) {
	if (!DB.DatabaseTables.includes(table) || !DB.Ids.includes(idName))
		throw new ValidationError("Invalid field name, query unsafe");

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
	if (!DB.DatabaseTables.includes(table) || !DB.Ids.includes(idName))
		throw new ValidationError("Invalid field name, query unsafe");

	const query = await pool.query({
		text: `DELETE FROM ${table} WHERE ${idName} = $1`,
		values: [id],
	});

	return query;
}

export async function updateRowFromTableWithId<T extends DB.TableObjects>({
	table,
	columnsAndPlaceholders,
	values,
	id,
	idName,
}: UpdateQuery) {
	if (!DB.DatabaseTables.includes(table) || !DB.Ids.includes(idName))
		throw new ValidationError("Invalid field name, query unsafe");

	const query = await pool.query<T>({
		text: `
		UPDATE ${table}
		SET ${columnsAndPlaceholders}
		WHERE ${idName} = $1
		RETURNING *
		`,
		values: [id, ...values],
	});

	return query;
}
