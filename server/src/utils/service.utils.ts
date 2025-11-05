import { pool } from "../configs/pg.config.js";

export async function queryInTransaction<T, U>(queryFn: (data: T) => Promise<U>, data: T) {
	const client = await pool.connect();

	try {
		await client.query("BEGIN");
		const query = await queryFn(data);
		await client.query("COMMIT");

		return query;
	} catch (error) {
		await client.query("ROLLBACK");
		console.log("DB transaction error: ", error);
	} finally {
		client.release();
	}
}
