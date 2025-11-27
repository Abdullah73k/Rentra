import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Banknote } from "lucide-react";
import { Button } from "../ui/button";
import type { Loan } from "@/lib/types";

const LoanCard = ({ loan }: { loan: Loan }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Banknote className="h-5 w-5" />
          Loan
        </CardTitle>
        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
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
            <p className="font-semibold text-foreground">
              {loan.interestRate}%
            </p>
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
      </CardContent>
    </Card>
  );
};

export default LoanCard;
