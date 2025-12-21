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

export const TenantRepository = {
	async createTenant(tenant: DB.CreateTenant, client?: PoolClient) {
		const { values, queryPlaceholders, columns, keys } =
			generateCreateQueryColsAndValues(tenant);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Tenant>({
					table: "Tenant",
					columns,
					keys,
					colValidation: TENANT_COLUMNS,
					queryPlaceholders,
					values,
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Tenant")
		);

		return query;
	},
	async getTenant(propertyId: string, client?: PoolClient) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Tenant>({
					table: "Tenant",
					id: propertyId,
					idName: "propertyId",
					client,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Tenant")
		);

		return query;
	},
	async updateTenant(tenant: DB.Tenant, client?: PoolClient) {
		const dbFn = async (tenant: DB.Tenant, client?: PoolClient) => {
			const { setString, values, keys } = buildUpdateSet(tenant);
			const query = await updateRowFromTableWithId<DB.Tenant>({
				table: "Tenant",
				columnsAndPlaceholders: setString,
				values,
				keys,
				colValidation: TENANT_COLUMNS,
				id: tenant.id,
				idName: "id",
				client,
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(tenant, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Tenant")
		);

		return query;
	},
};
