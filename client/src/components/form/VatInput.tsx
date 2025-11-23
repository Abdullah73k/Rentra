import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  type UseFormReturn,
  type FieldValues,
  type Path,
} from "react-hook-form";

type VatInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>; // ensures name is a valid key of your form
  label: string;
  placeholder: string;
};

const VatInput = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: VatInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-medium uppercase tracking-wide text-gray-600">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              id="vat-rate"
              type="number"
              placeholder={placeholder}
              min="0"
              max="100"
              step="0.01"
              className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default VatInput;
