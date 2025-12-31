import { SUPABASE_PUBLIC_BUCKET_NAME } from "../constants/supabase.constants.js";
import { UserRepository } from "../repositories/user.repositories.js";
import type { MulterFile } from "../types/util.types.js";
import {
	insertAvatarInBucket,
	deleteFolderContents,
} from "../utils/bucket.utils.js";
import { avatarFolderPathBuilder } from "../utils/doc-path-builder.utils.js";

export const UserService = {
	async updateAvatar({
		userId,
		avatar,
	}: {
		userId: string;
		avatar: MulterFile;
	}) {
		const folderPath = avatarFolderPathBuilder({ userId });
		await deleteFolderContents({
			bucket: SUPABASE_PUBLIC_BUCKET_NAME,
			folderPath,
		});

		const data = await insertAvatarInBucket({ file: avatar, userId });
		await UserRepository.updateAvatar({ userId, avatar: data.path });

		return data.publicUrl;
	},
};
