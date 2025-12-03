import { Users } from "lucide-react";
import { type Tenant } from "@/lib/types";
import CustomCard from "../CustomCard";

const TenantCard = ({ tenant }: { tenant: Tenant }) => {
  return (
    <CustomCard title="Tenant" Icon={Users}>
      <div>
        <p className="text-sm text-muted-foreground">Name</p>
        <p className="font-semibold text-foreground">{tenant.name}</p>
      </div>
      {tenant.phone && (
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="text-sm text-foreground">{tenant.phone}</p>
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground">Email</p>
        <p className="text-sm text-foreground">{tenant.email}</p>
      </div>
    </CustomCard>
  );
};

export default TenantCard;
