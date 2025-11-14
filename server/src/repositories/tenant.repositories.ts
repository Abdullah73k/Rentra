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

export const TenantRepository = {
	async createTenant(tenant: DB.CreateTenant) {
		const { values, queryPlaceholders, columns } =
			generateCreateQueryColsAndValues(tenant);

		const query = await executeDataBaseOperation(
			() =>
				insertIntoTable<DB.Tenant>({
					table: "Tenant",
					columns,
					queryPlaceholders,
					values,
				}),
			StatusCodes.BAD_REQUEST,
			failedDbInsertMessage(columns, "Tenant")
		);

		return query;
	},
	async getTenant(propertyId: string) {
		const query = await executeDataBaseOperation(
			() =>
				getRowsFromTableWithId<DB.Tenant>({
					table: "Tenant",
					id: propertyId,
					idName: "propertyId",
				}),
			StatusCodes.BAD_REQUEST,
			failedDbGetMessage("Tenant")
		);

		return query;
	},
	async updateTenant(tenant: DB.Tenant) {
		const dbFn = async (tenant: DB.Tenant) => {
			const { setString, values } = buildUpdateSet(tenant);
			const query = await updateRowFromTableWithId<DB.Tenant>({
				table: "Tenant",
				columnsAndPlaceholders: setString,
				values,
				id: tenant.id,
				idName: "id",
			});

			return query;
		};

		const query = await executeDataBaseOperation(
			() => dbFn(tenant),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("Tenant")
		);

		return query;
	},
};
