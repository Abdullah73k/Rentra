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

export function privateDocsPathBuilder({
	userId,
	referenceId,
	documentId,
	documentName,
	propertyId,
	label,
}: {
	userId: string;
	documentId: string;
	documentName: string;
	propertyId: string;
	referenceId: string | undefined;
	label: "leases" | "loans" | "tenants" | undefined;
}) {
	if (!label && !referenceId)
		return `users/${userId}/privateDocs/${propertyId}/${documentId}-${documentName}`;
	else
		return `users/${userId}/privateDocs/${propertyId}/${label}/${referenceId}/${documentId}-${documentName}`;
}
