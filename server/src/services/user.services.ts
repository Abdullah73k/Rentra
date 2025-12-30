import { SUPABASE_PUBLIC_BUCKET_NAME } from "../constants/supabase.constants.js";
import { UserRepository } from "../repositories/user.repositories.js";
import type { MulterFile } from "../types/util.types.js";
import { getFilePublicURL } from "../utils/bucket.utils.js";
import { avatarPathBuilder } from "../utils/doc-path-builder.utils.js";

export const UserService = {
	async updateAvatar({
		userId,
		avatar,
	}: {
		userId: string;
		avatar: MulterFile;
	}) {
		const path = avatarPathBuilder({ userId, avatarName: avatar.originalname });

		const user = await UserRepository.updateAvatar({ userId, avatar: path });
		const avatarUrl = getFilePublicURL({
			path: user[0]?.avatar as string,
			bucket: SUPABASE_PUBLIC_BUCKET_NAME,
		});

		return avatarUrl;
	},
};
