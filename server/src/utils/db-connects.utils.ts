import type { PoolClient } from "./service.utils.js";
import { pool } from "../db/configs/drizzle-orm.config.js";

export const dbConnection = (client?: PoolClient) => {
	return client ?? pool;
};