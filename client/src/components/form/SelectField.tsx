import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectFieldProps<
  T extends FieldValues,
  K extends { value: string; label: string } | string
> = {
  form: UseFormReturn<T>;
  name: Path<T>; // ensures name is a valid key of your form
  label: string;
  placeholder: string;
  options: K[];
};

const SelectField = <
  T extends FieldValues,
  K extends { value: string; label: string } | string
>({
  form,
  name,
  label,
  placeholder,
  options,
}: SelectFieldProps<T, K>) => {
  let string = false;

  if (typeof options === "string") {
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
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
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
  if (string) {
    
  }
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
};

export default SelectField;
