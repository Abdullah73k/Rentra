import { pool } from "../configs/pg.config.js";
import { DBError } from "../errors/db.errors.js";

export async function queryInTransaction<T, U>(
	queryFn: (data: T) => Promise<U>,
	data: T,
	errMsg: string
) {
	const client = await pool.connect();

	try {
		await client.query("BEGIN");
		const query = await queryFn(data);
		await client.query("COMMIT");

		return query;
	} catch (error) {
		if (error instanceof DBError) {
			console.error(error.message, error);
			throw new DBError(error.statusCode, errMsg, error);
		}
		await client.query("ROLLBACK");
		console.log("DB transaction error: ", error);
	} finally {
		client.release();
	}
}
