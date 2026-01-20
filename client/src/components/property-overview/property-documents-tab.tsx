import { FileText } from "lucide-react";

import DocumentSection from "./document-section";

type PropertyDocumentsTabProps = {
    propertyId: string;
    lease?: { id: string }[];
    loan?: { id: string }[];
    tenant?: { id: string }[];
}


function PropertyDocumentsTab({
    propertyId,
    lease,
    loan,
    tenant,
}: PropertyDocumentsTabProps) {
    const hasLease = lease && lease.length > 0;
    const hasLoan = loan && loan.length > 0;
    const hasTenant = tenant && tenant.length > 0;

    if (!hasLease && !hasLoan && !hasTenant) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
                <FileText className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg font-medium">No Entities Found</p>
                <p className="text-sm text-center max-w-md mt-2">
                    This property doesn't have any active leases, loans, or tenants associated with it.
                    Add a lease, loan, or tenant to manage their documents.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pt-4">
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
        </div>
    );
}

export default PropertyDocumentsTab;