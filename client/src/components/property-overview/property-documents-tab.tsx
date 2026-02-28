import DocumentSection from "./document-section";
import PortfolioChat from "./portfolio-chat";

type PropertyDocumentsTabProps = {
	propertyId: string;
	lease?: { id: string }[];
	loan?: { id: string }[];
	tenant?: { id: string }[];
};

function PropertyDocumentsTab({
	propertyId,
	lease,
	loan,
	tenant,
}: PropertyDocumentsTabProps) {
	const hasLease = lease && lease.length > 0;
	const hasLoan = loan && loan.length > 0;
	const hasTenant = tenant && tenant.length > 0;

	return (
		<div className="space-y-6 pt-4">
			<DocumentSection
				title="Property Docs"
				type="propertyDocs"
				referenceId={propertyId}
				propertyId={propertyId}
			/>
			{hasLease && (
				<DocumentSection
					title="Lease Documents"
					type="leaseDocs"
					referenceId={lease[0].id}
					propertyId={propertyId}
				/>
			)}
			{hasLoan && (
				<DocumentSection
					title="Loan Documents"
					type="loanDocs"
					referenceId={loan[0].id}
					propertyId={propertyId}
				/>
			)}
			{hasTenant && (
				<DocumentSection
					title="Tenant Documents"
					type="tenantDocs"
					referenceId={tenant[0].id}
					propertyId={propertyId}
				/>
			)}
			<PortfolioChat />
		</div>
	);
}

export default PropertyDocumentsTab;
