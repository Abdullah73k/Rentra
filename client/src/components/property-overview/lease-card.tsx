import { FileText } from "lucide-react";
import type { Lease } from "@/lib/types";
import CustomCard from "../custom-card";

const LeaseCard = ({ lease }: { lease: Lease }) => {
  return (
    <CustomCard Icon={FileText} title="Lease">
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
          {lease.currency} {lease.rentAmount.toLocaleString()} {lease.frequency}
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Deposit</p>
        <p className="font-semibold text-foreground">
          {lease.currency} {lease.deposit.toLocaleString()}
        </p>
      </div>
    </CustomCard>
  );
};

export default LeaseCard;
