import { pool } from "../config/pg.config.js";
import type { DatabaseTables, TableObjects } from "../types/db.types.js";

type InsertIntoTable = {
	table: DatabaseTables;
	columns: string;
	queryPlaceholders: string;
	values: any[];
};

export function generateCreateQueryColsAndValues<T extends TableObjects>(object: T) {
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
	for (let i = 1; i < length; i++) placeholder.push(i);
	const queryPlaceholders = placeholder.join(", ");

	return queryPlaceholders;
}

export async function insertIntoTable<T extends TableObjects>({
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
