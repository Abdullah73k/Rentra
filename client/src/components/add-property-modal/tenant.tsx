import type { UseFormReturn } from "react-hook-form";
import TextInput from "../form/text-input";
import type { FormFields } from "../modals/add-property-modal";

type TenantProps = {
  form: UseFormReturn<FormFields>;
};

const Tenant = ({ form }: TenantProps) => {
  return (
    <div className="space-y-4 border-b pb-6">
      <h3 className="font-semibold text-foreground">Tenant Information</h3>
      <TextInput
        form={form}
        name="tenant.name"
        label="Name *"
        placeholder="John Doe"
      />
      <TextInput
        form={form}
        name="tenant.phone"
        label="Phone"
        placeholder="+1 (555) 123-4567"
      />
      <TextInput
        form={form}
        name="tenant.email"
        label="Email *"
        placeholder="john@example.com"
        type="email"
      />
    </div>
  );
};

export default Tenant;
