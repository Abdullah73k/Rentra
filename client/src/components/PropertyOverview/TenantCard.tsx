import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { type Tenant } from "@/lib/types";

const TenantCard = ({ tenant }: { tenant: Tenant }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Tenant
        </CardTitle>
        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
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
      </CardContent>
    </Card>
  );
};

export default TenantCard;
