import { StatusCodes } from "../constants/statusCodes.constants.js";
import * as DB from "../types/db.types.js";
import { failedDbInsertMessage } from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	generateCreateQueryColsAndValues,
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
};
