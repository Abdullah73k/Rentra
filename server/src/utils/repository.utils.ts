import { pool } from "../configs/pg.config.js";
import * as DB from "../types/db.types.js";

type InsertIntoTable = {
	table: DB.DatabaseTables;
	columns: string;
	queryPlaceholders: string;
	values: any[];
};

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

export async function getRowsFromTableWithId<T extends DB.TableObjects>({
	table,
	id,
	idName,
}: {
	table: DB.DatabaseTables;
	id: string;
	idName: DB.Ids;
}) {
	const query = await pool.query<T>(`
		SELECT * FROM ${table}
		WHERE ${idName} = ${id}
		`);

	return query.rows;
}
