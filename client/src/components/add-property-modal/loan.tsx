import type { Path, UseFormReturn } from "react-hook-form";
import TextInput from "../form/text-input";
import type { FormFields } from "../modals/add-property-modal";

type LoanProps<T extends FormFields> = {
  form: UseFormReturn<T>;
};

const Loan = <T extends FormFields>({ form }: LoanProps<T>) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Loan Information</h3>
      <TextInput
        form={form}
        name={"loan.lender" as Path<T>}
        label="Lender *"
        placeholder="Bank Name"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name={"loan.termMonths" as Path<T>}
          label="Term (Months) *"
          type="number"
        />
        <TextInput
          form={form}
          name={"loan.monthlyPayment" as Path<T>}
          label="Monthly Payment *"
          type="number"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name={"loan.totalMortgageAmount" as Path<T>}
          label="Total Mortgage Amount *"
          type="number"
        />
        <TextInput
          form={form}
          name={"loan.interestRate" as Path<T>}
          label="Interest Rate (%) *"
          type="number"
        />
      </div>
    </div>
  );
};

export default Loan;
