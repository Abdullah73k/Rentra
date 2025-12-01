import { Input } from "../ui/input";
import { PROPERTY_PURPOSES, PROPERTY_TYPES } from "@/constants/form.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TextInput from "../form/TextInput";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { FormFields } from "../modals/addPropertyModal";

type PropertyProps = {
  form: UseFormReturn<FormFields>;
};

const Property = ({ form }: PropertyProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="property.purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROPERTY_PURPOSES.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="property.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="property.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="123 Main Street, Apt 4B" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
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
        <TextInput
          form={form}
          name="property.acquisitionDate"
          label="Acquisition Date *"
          type="date"
        />
        <TextInput
          form={form}
          name="property.valuationDate"
          label="Valuation Date *"
          type="date"
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
