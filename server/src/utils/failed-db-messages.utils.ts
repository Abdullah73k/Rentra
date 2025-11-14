import * as DB from "../types/db.types.js";

export const failedDbInsertMessage = (
	cols: string,
	table: DB.DatabaseTables
) => {
	return `Failed to insert ${cols} into ${table} table`;
};

export const failedDbGetMessage = (table: DB.DatabaseTables) => {
	return `Failed to get data from ${table} table`;
};

export const failedDbDeleteMessage = (table: DB.DatabaseTables) => {
	return `Failed to delete data from ${table}`;
};

export const failedDbUpdateMessage = (table: DB.DatabaseTables) => {
	return `Failed to update ${table} table data`;
};
