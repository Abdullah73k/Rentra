import type { PoolClient } from "../utils/service.utils.js";
import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	getRowsFromTableWithId,
	insertIntoTable,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";

import { lease } from "../db/schemas/lease.db.js";

export const LeaseRepository = {
	async createLease(
		leaseObject: DB.CreateLease,
		propertyId: string,
		tenantId: string,
		client?: PoolClient
	) {
		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable(
					lease,
					{ ...leaseObject, propertyId, tenantId },
					client
				),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage("Lease")
		);

		return query;
	},
	async getLease(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId.lease(propertyId, client),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Lease")
		);

		return query;
	},
	async updateLease(leaseObject: DB.Lease, client?: PoolClient) {
		const dbFn = async (leaseObject: DB.Lease, client?: PoolClient) => {
			const query = await updateRowFromTableWithId(
				lease,
				leaseObject,
				leaseObject.id,
				client
			);

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(leaseObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Lease")
		);

		return query;
	},
};
