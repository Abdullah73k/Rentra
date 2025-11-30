import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import type { AddPropertyFormData } from "@/lib/types";

const Loan = ({
  formData,
  handleInputChange,
}: {
  formData: AddPropertyFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Loan Information</h3>
      <div>
        <Label htmlFor="lender">Lender *</Label>
        <Input
          id="lender"
          name="lender"
          value={formData.lender}
          onChange={handleInputChange}
          placeholder="Bank Name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="termMonths">Term (Months) *</Label>
          <Input
            id="termMonths"
            name="termMonths"
            type="number"
            value={formData.termMonths}
            onChange={handleInputChange}
            min={0}
          />
        </div>
        <div>
          <Label htmlFor="monthlyPayment">Monthly Payment *</Label>
          <Input
            id="monthlyPayment"
            name="monthlyPayment"
            type="number"
            value={formData.monthlyPayment}
            onChange={handleInputChange}
            min={0}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalMortgageAmount">Total Mortgage Amount *</Label>
          <Input
            id="totalMortgageAmount"
            name="totalMortgageAmount"
            type="number"
            value={formData.totalMortgageAmount}
            onChange={handleInputChange}
            min={0}
          />
        </div>
        <div>
          <Label htmlFor="interestRate">Interest Rate (%) *</Label>
          <Input
            id="interestRate"
            name="interestRate"
            type="number"
            value={formData.interestRate}
            onChange={handleInputChange}
            min={0}
            max={100}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
};

export default Loan;
