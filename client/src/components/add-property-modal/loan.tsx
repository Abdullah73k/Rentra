import type { UseFormReturn } from "react-hook-form";
import TextInput from "../form/text-input";
import type { FormFields } from "../modals/add-property-modal";

type LoanProps = {
  form: UseFormReturn<FormFields>;
};

const Loan = ({ form }: LoanProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Loan Information</h3>
      <TextInput
        form={form}
        name="loan.lender"
        label="Lender *"
        placeholder="Bank Name"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="loan.termMonths"
          label="Term (Months) *"
          type="number"
        />
        <TextInput
          form={form}
          name="loan.monthlyPayment"
          label="Monthly Payment *"
          type="number"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="loan.totalMortgageAmount"
          label="Total Mortgage Amount *"
          type="number"
        />
        <TextInput
          form={form}
          name="loan.interestRate"
          label="Interest Rate (%) *"
          type="number"
        />
      </div>
    </div>
  );
};

export default Loan;
