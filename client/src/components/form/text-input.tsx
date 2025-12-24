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

type TextInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>; // ensures name is a valid key of your form
  label: string;
  placeholder?: string;
  type?: "number" | "text" | "date" | "email" | "decimal";
  autoComplete?: string;
};

const TextInput = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: TextInputProps<T>) => {
  let formType = type;
  if (type === "decimal") {
    formType = "number";
  }
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
              className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
              placeholder={placeholder}
              {...field}
              autoComplete={autoComplete}
              type={formType}
              onChange={
                type === "number"
                  ? (e) => field.onChange(e.target.valueAsNumber)
                  : field.onChange
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
