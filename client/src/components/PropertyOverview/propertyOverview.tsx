import React from "react";
import PropertyInfoCard from "./PropertyInfoCard";
import type { PropertyOverviewProps } from "@/lib/types";
import TenantCard from "./TenantCard";
import LeaseCard from "./LeaseCard";
import LoanCard from "./LoanCard";
import AddNewField from "./AddNewField";
import PropertyDetailsCard from "./PropertyDetailsCard";

const PropertyOverview: React.FC<PropertyOverviewProps> = ({
  property,
  propertyInfo,
  tenant,
  lease,
  loan,
}) => {
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
          <AddNewField name="Tenant" message="No tenant added yet" />
        )}

        {/* Lease Card */}
        {lease ? (
          <LeaseCard lease={lease} />
        ) : (
          <AddNewField name="Lease" message="No lease added yet" />
        )}

        {/* Loan Card */}
        {loan ? (
          <LoanCard loan={loan} />
        ) : (
          <AddNewField name="Loan" message="No loan added yet" />
        )}
      </div>
    </div>
  );
};

export default PropertyOverview;
