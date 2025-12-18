import { PROPERTY_PURPOSES, PROPERTY_TYPES } from "@/constants/form.constants";
import TextInput from "../form/text-input";
import type { UseFormReturn } from "react-hook-form";
import type { FormFields } from "../modals/add-property-modal";
import DateInput from "../form/date-input";
import SelectField from "../form/select-field";
import { COUNTRY_OPTIONS, CURRENCY_OPTIONS } from "@/constants/auth.constants";

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
        <SelectField
          form={form}
          name="property.country"
          label="Country *"
          placeholder="United Arab Emirates"
          options={COUNTRY_OPTIONS}
        />
        <SelectField
          form={form}
          name="property.currency"
          label="Currency *"
          placeholder="AED"
          options={CURRENCY_OPTIONS}
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
        {/* TODO: add a photo input here */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="property.currentValue"
          label="Current Value *"
          placeholder="0"
          type="number"
        />
        <SelectField
          form={form}
          name="property.sold"
          label="Sold *"
          placeholder="Select"
          options={["Yes", "No"]}
        />
      </div>
    </div>
  );
};

export default Property;
