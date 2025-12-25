export function photoPathBuilder({
	userId,
	propertyId,
	documentId,
	documentName,
}: {
	userId: string;
	propertyId: string;
	documentId: string;
	documentName: string;
}) {
	return `users/${userId}/properties/${propertyId}/photo/${documentId}-${documentName}`;
}
