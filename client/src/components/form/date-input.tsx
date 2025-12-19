import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type DateInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
};

const DateInput = <T extends FieldValues>({
  form,
  name,
  label,
}: DateInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const value = field.value as unknown;

        const dateValue =
          value instanceof Date
            ? value
            : typeof value === "string" && value
            ? new Date(value)
            : undefined;

        const isValidDate =
          dateValue instanceof Date && !isNaN(dateValue.getTime());
        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value
                      ? format(field.value as Date, "PPP")
                      : "Pick a date"}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={isValidDate ? dateValue : undefined}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : null);
                  }}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DateInput;
