import { StatusCodes } from "../constants/status-codes.constants.js";
import { failedDbUpdateMessage } from "../utils/failed-db-messages.utils.js";
import {
	executeDataBaseOperation,
	updateRowFromTableWithId,
} from "../utils/repository.utils.js";
import type { PoolClient } from "../utils/service.utils.js";

export const UserRepository = {
	async updateAvatar({
		userId,
		avatar,
		client,
	}: {
		userId: string;
		avatar: string;
		client: PoolClient | undefined;
	}) {
		const query = await executeDataBaseOperation(
			() => updateRowFromTableWithId.user(userId, avatar, client),
			StatusCodes.BAD_REQUEST,
			failedDbUpdateMessage("User")
		);
		return query;
	},
};
