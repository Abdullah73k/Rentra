import type { PoolClient } from "pg"
import { pool } from "../configs/pg.config.js"

export const dbConnection = (client?: PoolClient) => {
    return client ?? pool
}
