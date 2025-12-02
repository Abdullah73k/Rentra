import { FURNISHING_TYPES, PROPERTY_STATUS } from "@/constants/form.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import NotesInput from "../form/NotesInput";

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
        <FormField
          control={form.control}
          name="propertyInfo.status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROPERTY_STATUS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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

      <FormField
        control={form.control}
        name="propertyInfo.furnishing"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Furnishing *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {FURNISHING_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() +
                      type.slice(1).replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <TextInput
        form={form}
        name="propertyInfo.parking"
        label="Parking"
        placeholder="Covered Parking - Spot B12"
      />

      <NotesInput form={form} name="propertyInfo.notes" />
    </div>
  );
};

export default PropertyInfo;
