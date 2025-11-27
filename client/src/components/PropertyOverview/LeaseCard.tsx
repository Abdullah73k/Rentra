import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import type { Lease } from "@/lib/types";

const LeaseCard = ({ lease }: { lease: Lease }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Lease
        </CardTitle>
        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-semibold text-foreground">
              {new Date(lease.start).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">End Date</p>
            <p className="font-semibold text-foreground">
              {new Date(lease.end).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Rent</p>
          <p className="font-semibold text-foreground">
            {lease.currency} {lease.rentAmount.toLocaleString()}{" "}
            {lease.frequency}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Deposit</p>
          <p className="font-semibold text-foreground">
            {lease.currency} {lease.deposit.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaseCard;
