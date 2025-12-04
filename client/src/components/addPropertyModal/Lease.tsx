import TextInput from "../form/TextInput";
import { LEASE_FREQUENCIES } from "@/constants/form.constants";
import type { FormFields } from "../modals/addPropertyModal";
import type { UseFormReturn } from "react-hook-form";
import DateInput from "../form/DateInput";
import SelectField from "../form/SelectField";

type LeaseProps = {
  form: UseFormReturn<FormFields>;
};

const Lease = ({ form }: LeaseProps) => {
  return (
    <div className="space-y-4 border-b pb-6">
      <h3 className="font-semibold text-foreground">Lease Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <DateInput form={form} name="lease.leaseStart" label="Start Date *" />
        <DateInput form={form} name="lease.leaseEnd" label="End Date *" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="lease.rentAmount"
          label="Rent Amount *"
          type="number"
        />
        <SelectField
          form={form}
          name="lease.frequency"
          label="Frequency *"
          options={LEASE_FREQUENCIES}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="lease.paymentDay"
          label="Payment Day (1-31) *"
          type="number"
        />
        <TextInput
          form={form}
          name="lease.deposit"
          label="Deposit *"
          type="number"
        />
      </div>
    </div>
  );
};

export default Lease;
