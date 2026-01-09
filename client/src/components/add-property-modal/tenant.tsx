import type { Path, UseFormReturn } from "react-hook-form";
import TextInput from "../form/text-input";
import type { FormFields } from "../modals/add-property-modal";

type TenantProps<T extends FormFields> = {
  form: UseFormReturn<T>;
};

const Tenant = <T extends FormFields>({ form }: TenantProps<T>) => {
  return (
    <div className="space-y-4 border-b pb-6">
      <h3 className="font-semibold text-foreground">Tenant Information</h3>
      <TextInput
        form={form}
        name={"tenant.name" as Path<T>}
        label="Name *"
        placeholder="John Doe"
      />
      <TextInput
        form={form}
        name={"tenant.phone" as Path<T>}
        label="Phone"
        placeholder="+1 (555) 123-4567"
      />
      <TextInput
        form={form}
        name={"tenant.email" as Path<T>}
        label="Email *"
        placeholder="john@example.com"
        type="email"
      />
    </div>
  );
};

export default Tenant;
