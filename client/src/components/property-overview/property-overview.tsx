import PropertyInfoCard from "./property-info-card";
import type { NewPropertyBuildType } from "@/lib/types";
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
	property: NewPropertyBuildType["property"];
	propertyInfo: NewPropertyBuildType["propertyInfo"];
	tenant: NewPropertyBuildType["tenant"];
	lease: NewPropertyBuildType["lease"];
	loan: NewPropertyBuildType["loan"];
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
				<AddTenantModal />
				<AddLoanModal />
				<AddLeaseModal />
			</div>
		</div>
	);
};

export default PropertyOverview;
