import TextInput from "../form/text-input";
import { LEASE_FREQUENCIES } from "@/constants/form.constants";
import type { FormFields } from "../modals/add-property-modal";
import type { Path, UseFormReturn } from "react-hook-form";
import DateInput from "../form/date-input";
import SelectField from "../form/select-field";
import { CURRENCY_OPTIONS } from "@/constants/auth.constants";

type LeaseProps<T extends FormFields> = {
  form: UseFormReturn<T>;
};

const Lease = <T extends FormFields>({ form }: LeaseProps<T>) => {
  return (
    <div className="space-y-4 border-b pb-6">
      <h3 className="font-semibold text-foreground">Lease Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <DateInput
          form={form}
          name={"lease.start" as Path<T>}
          label="Start Date *"
        />
        <DateInput
          form={form}
          name={"lease.end" as Path<T>}
          label="End Date *"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name={"lease.rentAmount" as Path<T>}
          label="Rent Amount *"
          type="number"
        />
        <SelectField
          form={form}
          name={"lease.currency" as Path<T>}
          label="Currency *"
          placeholder="Select Currency"
          options={CURRENCY_OPTIONS}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          form={form}
          name={"lease.frequency" as Path<T>}
          label="Frequency *"
          placeholder="Select Frequency"
          options={LEASE_FREQUENCIES}
        />
        <TextInput
          form={form}
          name={"lease.paymentDay" as Path<T>}
          label="Payment Day (1-31) *"
          type="number"
        />
      </div>

      <TextInput
        form={form}
        name={"lease.deposit" as Path<T>}
        label="Deposit Amount *"
        type="number"
      />
    </div>
  );
};

export default Lease;
