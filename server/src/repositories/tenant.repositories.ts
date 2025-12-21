import { TENANT_COLUMNS } from "../constants/db-table-columns.constants.js";
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
			// 	insertIntoTable<DB.Tenant>({
			// 		table: "Tenant",
			// 		columns,
			// 		keys,
			// 		colValidation: TENANT_COLUMNS,
			// 		queryPlaceholders,
			// 		values,
			// 		client,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Tenant")
		);

		return query;
	},
	async getTenant(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() => getRowsFromTableWithId(tenant, propertyId, client),
			// 	getRowsFromTableWithId<DB.Tenant>({
			// 		table: "Tenant",
			// 		id: propertyId,
			// 		idName: "propertyId",
			// 		client,
			// 	}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Tenant")
		);

		return query;
	},
	async updateTenant(tenantObject: DB.Tenant, client?: PoolClient) {
		const dbFn = async (tenantObject: DB.Tenant, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(tenantObject);
			const query = await updateRowFromTableWithId(
				tenant,
				tenantObject,
				tenantObject.id,
				client
			);
			// const query = await updateRowFromTableWithId<DB.Tenant>({
			// 	table: "Tenant",
			// 	columnsAndPlaceholders: setString,
			// 	values,
			// 	keys,
			// 	colValidation: TENANT_COLUMNS,
			// 	id: tenant.id,
			// 	idName: "id",
			// 	client,
			// });

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
