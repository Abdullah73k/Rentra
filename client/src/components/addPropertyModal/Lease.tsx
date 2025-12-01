import TextInput from "../form/TextInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LEASE_FREQUENCIES } from "@/constants/form.constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { FormFields } from "../modals/addPropertyModal";
import type { UseFormReturn } from "react-hook-form";
import DateInput from "../form/DateInput";

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
        <FormField
          control={form.control}
          name="lease.frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LEASE_FREQUENCIES.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq.charAt(0).toUpperCase() +
                        freq.slice(1).replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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
