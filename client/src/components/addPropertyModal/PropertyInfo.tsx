import { FURNISHING_TYPES, PROPERTY_STATUS } from "@/constants/form.constants";
import { Textarea } from "../ui/textarea";
import TextInput from "../form/TextInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { FormFields } from "../modals/addPropertyModal";
import SelectField from "../form/SelectField";

type PropertyInfoProps = {
  form: UseFormReturn<FormFields>;
};

const PropertyInfo = ({ form }: PropertyInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="propertyInfo.propertyNumber"
          label="Property Number *"
          placeholder="4B"
        />
        <SelectField
          form={form}
          name="propertyInfo.status"
          label="Status *"
          options={PROPERTY_STATUS}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextInput
          form={form}
          name="propertyInfo.bedrooms"
          label="Bedrooms *"
          type="number"
        />
        <TextInput
          form={form}
          name="propertyInfo.bathrooms"
          label="Bathrooms *"
          type="number"
        />
        <TextInput
          form={form}
          name="propertyInfo.sizeSqm"
          label="Size (sqm) *"
          type="number"
        />
      </div>
      <SelectField
        form={form}
        name="propertyInfo.furnishing"
        label="Furnishing *"
        options={FURNISHING_TYPES}
      />

      <TextInput
        form={form}
        name="propertyInfo.parking"
        label="Parking"
        placeholder="Covered Parking - Spot B12"
      />

      <FormField
        control={form.control}
        name="propertyInfo.notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Add any additional notes about the property..."
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyInfo;
