import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox"; // Assuming you have shadcn/ui Checkbox component
import Lease from "./lease";
import Loan from "./loan";
import Tenant from "./tenant";
import type { UseFormReturn } from "react-hook-form";
import type { FormFields } from "../modals/add-property-modal";

type OptionalSectionsProps = {
  form: UseFormReturn<FormFields>;
};

const OptionalSections = ({ form }: OptionalSectionsProps) => {
  const watchedOptionalSections = form.watch("optionalSections");

  return (
    <div className="space-y-6">
      {/* Toggle Sections */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="font-semibold text-foreground">Optional Sections</h3>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="optionalSections.addTenant"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm cursor-pointer">
                  Add Tenant Now?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="optionalSections.addLease"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm cursor-pointer">
                  Add Lease Now?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="optionalSections.addLoan"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm cursor-pointer">
                  Add Loan Now?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Tenant Form */}
      {watchedOptionalSections?.addTenant && <Tenant form={form} />}

      {/* Lease Form */}
      {watchedOptionalSections?.addLease && <Lease form={form} />}

      {/* Loan Form */}
      {watchedOptionalSections?.addLoan && <Loan form={form} />}
    </div>
  );
};

export default OptionalSections;
