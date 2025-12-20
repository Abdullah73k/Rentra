import type { PoolClient } from "pg";
import { pool } from "../db/configs/pg.config.js";

export const dbConnection = (client?: PoolClient) => {
	return client ?? pool;
};
