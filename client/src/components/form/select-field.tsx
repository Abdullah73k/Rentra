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
import { isStringArray } from "@/lib/utils";
import type { SelectOptions } from "@/lib/types";

type SelectFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: string[] | SelectOptions[];
};

const SelectField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "",
  options,
}: SelectFieldProps<T>) => {
  if (isStringArray(options)) {
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
                <SelectTrigger className="h-12! w-full rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => {
                  const formatted = option.replace(/_/g, " ");
                  return (
                    <SelectItem key={option} value={option}>
                      {formatted.charAt(0).toUpperCase() + formatted.slice(1)}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  const selectOptions = options as SelectOptions[];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-xs font-medium uppercase tracking-wide text-gray-600">
            {label}
          </FormLabel>
          <Select
            onValueChange={(val) => {
              const parsed =
                val === "true" ? true : val === "false" ? false : val;
              field.onChange(parsed);
            }}
            defaultValue={String(field.value)}
          >
            <FormControl>
              <SelectTrigger className="h-12! w-full rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectOptions.map((option) => (
                <SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                >
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
