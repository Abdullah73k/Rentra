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
  );
};

export default NotesInput;
