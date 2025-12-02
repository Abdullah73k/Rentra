import { PROPERTY_PURPOSES, PROPERTY_TYPES } from "@/constants/form.constants";
import TextInput from "../form/TextInput";
import type { UseFormReturn } from "react-hook-form";
import type { FormFields } from "../modals/addPropertyModal";
import DateInput from "../form/DateInput";
import SelectField from "../form/SelectField";

type PropertyProps = {
  form: UseFormReturn<FormFields>;
};

const Property = ({ form }: PropertyProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          form={form}
          name="property.purpose"
          label="Purpose *"
          placeholder="Select purpose"
          options={PROPERTY_PURPOSES}
        />
        <SelectField
          form={form}
          name="property.type"
          label="Type *"
          placeholder="Select type"
          options={PROPERTY_TYPES}
        />
      </div>
      <TextInput
        form={form}
        name="property.address"
        label="Address *"
        placeholder="123 Main Street, Apt 4B"
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="property.country"
          label="Country *"
          placeholder="United Arab Emirates"
        />
        <TextInput
          form={form}
          name="property.currency"
          label="Currency *"
          placeholder="AED"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="property.purchasePrice"
          label="Purchase Price *"
          placeholder="0"
          type="number"
        />
        <TextInput
          form={form}
          name="property.closingCosts"
          label="Closing Costs *"
          placeholder="0"
          type="number"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DateInput
          form={form}
          name="property.acquisitionDate"
          label="Acquisition Date *"
        />
        <DateInput
          form={form}
          name="property.valuationDate"
          label="Valuation Date *"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="property.currentValue"
          label="Current Value *"
          placeholder="0"
          type="number"
        />
      </div>
    </div>
  );
};

export default Property;
