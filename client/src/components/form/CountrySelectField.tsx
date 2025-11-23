import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Adjust import path as needed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Adjust import path as needed
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface CountryOption {
  value: string;
  label: string;
}

type CountrySelectFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>; // ensures name is a valid key of your form
  label: string;
  placeholder: string;
};

const options: CountryOption[] = [
  { value: "ae", label: "United Arab Emirates" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
];

const  CountrySelectField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: CountrySelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-xs font-medium uppercase tracking-wide text-gray-600">
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-12 rounded-lg border-gray-300 w-full text-sm focus-visible:ring-1 focus-visible:ring-black">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CountrySelectField