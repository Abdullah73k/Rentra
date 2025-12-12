import { Banknote } from "lucide-react";
import type { Loan } from "@/lib/types";
import CustomCard from "../custom-card";

const LoanCard = ({ loan }: { loan: Loan }) => {
  return (
    <CustomCard Icon={Banknote} title="Loan">
      <div>
        <p className="text-sm text-muted-foreground">Lender</p>
        <p className="font-semibold text-foreground">{loan.lender}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Term</p>
          <p className="font-semibold text-foreground">
            {loan.termMonths} months
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Interest Rate</p>
          <p className="font-semibold text-foreground">{loan.interestRate}%</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Total Amount</p>
        <p className="font-semibold text-foreground">
          {loan.totalMortgageAmount.toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Monthly Payment</p>
        <p className="font-semibold text-foreground">
          {loan.monthlyPayment.toLocaleString()}
        </p>
      </div>
    </CustomCard>
  );
};

export default LoanCard;
