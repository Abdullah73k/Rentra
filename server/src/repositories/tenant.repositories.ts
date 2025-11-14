import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import {
	failedDbGetMessage,
	failedDbInsertMessage,
} from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
	getRowsFromTableWithId,
	insertIntoTable,
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
};
