import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type NotesInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>; // ensures name is a valid key of your form
};

const NotesInput = <T extends FieldValues>({
  form,
  name,
}: NotesInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs font-medium uppercase tracking-wide text-gray-600">
            Notes
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
              placeholder="Add any notes..."
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NotesInput;
