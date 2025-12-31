export type PhotoPathBuilderConfig = {
	userId: string;
	propertyId: string;
	documentId: string;
	documentName: string;
};

export function photoPathBuilder({
	userId,
	propertyId,
	documentId,
	documentName,
}: PhotoPathBuilderConfig) {
	return `users/${userId}/properties/${propertyId}/photo/${documentId}-${documentName}`;
}

export function avatarPathBuilder({
	userId,
	avatarName,
}: {
	userId: string;
	avatarName: string;
}) {
	return `users/${userId}/avatar/${avatarName}`;
}

export function avatarFolderPathBuilder({ userId }: { userId: string }) {
	return `users/${userId}/avatar`;
}
