import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
	failedDbUpdateMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";
import type { PoolClient } from "../utils/service.utils.js";

import { tenant } from "../db/schemas/tenant.db.js";

export const TenantRepository = {
	async createTenant(
		tenantObject: DB.CreateTenant,
		propertyId: string,
		client?: PoolClient
	) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(tenantObject);

		const query = await executeDataBaseOperation(
			() => insertIntoTable(tenant, { ...tenantObject, propertyId }, client),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Tenant")
		);

		return query;
	},
	async getTenant(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId(tenant, propertyId, client),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Tenant")
		);

		return query;
	},
	async updateTenant(tenantObject: DB.Tenant, client?: PoolClient) {
		const dbFn = async (tenantObject: DB.Tenant, client?: PoolClient) => {
			const query = await updateRowFromTableWithId(
				tenant,
				tenantObject,
				tenantObject.id,
				client
			);
			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(tenantObject, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Tenant")
		);

		return query;
	},
};
