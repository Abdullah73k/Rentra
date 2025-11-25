import type { PoolClient } from "pg";
import { LEASE_COLUMNS } from "../constants/db-table-columns.constants.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	buildUpdateSet,
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";

export const LeaseRepository = {
	async createLease(lease: DB.CreateLease, client?: PoolClient) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(lease);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Lease>({
					table: "Lease",
					columns,
					keys,
					colValidation: LEASE_COLUMNS,
					queryPlaceholders,
					client,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Lease")
		);

		return query;
	},
	async getLease(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Lease>({
					table: "Lease",
					id: propertyId,
					idName: "propertyId",
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Lease")
		);

		return query;
	},
	async updateLease(lease: DB.Lease, client?: PoolClient) {
		const dbFn = async (lease: DB.Lease, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(lease);
			const query = await updateRowFromTableWithId<DB.Lease>({
				table: "Lease",
				columnsAndPlaceholders: setString,
				keys,
				colValidation: LEASE_COLUMNS,
				values,
				id: lease.id,
				idName: "id",
				client,
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(lease, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Lease")
		);

		return query;
	},
};
