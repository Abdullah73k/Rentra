import PropertyInfoCard from "./property-info-card";
import type { FetchPropertyReturnType } from "@/lib/types";
import TenantCard from "./tenant-card";
import LeaseCard from "./lease-card";
import LoanCard from "./loan-card";
import AddNewField from "./add-new-field";
import PropertyDetailsCard from "./property-details-card";
import AddTenantModal from "../modals/add-tenant-modal";
import AddLoanModal from "../modals/add-loan-modal";
import AddLeaseModal from "../modals/add-lease-modal";
import { usePropertyStore } from "@/stores/property.store";

const PropertyOverview = ({
	property,
	propertyInfo,
	tenant,
	lease,
	loan,
}: {
	property: FetchPropertyReturnType["property"][0];
	propertyInfo: FetchPropertyReturnType["propertyInfo"][0];
	tenant: FetchPropertyReturnType["tenant"][0];
	lease: FetchPropertyReturnType["lease"][0];
	loan: FetchPropertyReturnType["loan"][0];
}) => {
	const { setIsAddTenantOpen, setIsAddLoanOpen, setIsAddLeaseOpen } = usePropertyStore();

	return (
		<div className="p-6">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Property Card */}
				<PropertyDetailsCard property={property} propertyInfo={propertyInfo} />

				{/* Property Info Card */}
				<PropertyInfoCard propertyInfo={propertyInfo} />

				{/* Tenant Card */}
				{tenant ? (
					<TenantCard tenant={tenant} />
				) : (
					<AddNewField name="Tenant" message="No tenant added yet" onClick={() => setIsAddTenantOpen(true)} />
				)}

				{/* Lease Card */}
				{lease ? (
					<LeaseCard lease={lease} />
				) : (
					<AddNewField name="Lease" message="No lease added yet" onClick={() => setIsAddLeaseOpen(true)} />
				)}

				{/* Loan Card */}
				{loan ? (
					<LoanCard loan={loan} />
				) : (
					<AddNewField name="Loan" message="No loan added yet" onClick={() => setIsAddLoanOpen(true)} />
				)}
				<AddTenantModal propertyId={property.id} />
				<AddLoanModal propertyId={property.id} />
				<AddLeaseModal propertyId={property.id} />
			</div>
		</div>
	);
};

export default PropertyOverview;
