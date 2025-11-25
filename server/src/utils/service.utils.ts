import type { PoolClient } from "pg";
import { DBError } from "../errors/db.errors.js";
import { ValidationError } from "../errors/validation.errors.js";

export async function queryInTransaction<T, U>(
	queryFn: (data: T, client: PoolClient) => Promise<U>,
	data: T,
	client: PoolClient,
	errMsg: string
) {

	try {
		await client.query("BEGIN");
		const query = await queryFn(data, client);
		await client.query("COMMIT");

		return query;
	} catch (error) {
		await client.query("ROLLBACK");
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
	} finally {
		client.release();
	}
}
