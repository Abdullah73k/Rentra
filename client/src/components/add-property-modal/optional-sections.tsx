import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import Lease from "./lease";
import Loan from "./loan";
import Tenant from "./tenant";
import type { UseFormReturn, Path } from "react-hook-form";
import { type z } from "zod";
import { propertyDataSchema } from "@/lib/schemas";

type FormFields = z.input<typeof propertyDataSchema>;

type OptionalSectionsProps<T extends FormFields> = {
	form: UseFormReturn<T>;
	disabledOptions?: {
		addTenant?: boolean;
		addLease?: boolean;
		addLoan?: boolean;
	};
};

const OptionalSections = <T extends FormFields>({
	form,
	disabledOptions,
}: OptionalSectionsProps<T>) => {
	// We need to cast the watch argument because TypeScript can't verify 'optionalSections' exists on T
	// But we know it does in our usage.
	const watchedOptionalSections = form.watch(
		"optionalSections" as Path<T>
	) as any;

	return (
		<div className="space-y-6">
			{/* Toggle Sections */}
			<div className="space-y-4 border-b pb-6">
				<h3 className="font-semibold text-foreground">Optional Sections</h3>
				<div className="space-y-3">
					<FormField
						disabled={disabledOptions?.addTenant}
						control={form.control}
						name={"optionalSections.addTenant" as Path<T>}
						render={({ field }) => (
							<FormItem className="flex items-center space-x-2">
								<FormControl>
									<Checkbox
										checked={!!field.value}
										onCheckedChange={field.onChange}
										disabled={disabledOptions?.addTenant}
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
						disabled={disabledOptions?.addLease}
						control={form.control}
						name={"optionalSections.addLease" as Path<T>}
						render={({ field }) => (
							<FormItem className="flex items-center space-x-2">
								<FormControl>
									<Checkbox
										checked={!!field.value}
										onCheckedChange={field.onChange}
										disabled={disabledOptions?.addLease}
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
						disabled={disabledOptions?.addLoan}
						control={form.control}
						name={"optionalSections.addLoan" as Path<T>}
						render={({ field }) => (
							<FormItem className="flex items-center space-x-2">
								<FormControl>
									<Checkbox
										checked={!!field.value}
										onCheckedChange={field.onChange}
										disabled={disabledOptions?.addLoan}
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
			{/* Casting form to any here to allow compatibility with non-generic children for now, 
          or until they are updated. This prevents compile errors in this file. */}
			{watchedOptionalSections?.addTenant && <Tenant form={form} />}

			{/* Lease Form */}
			{watchedOptionalSections?.addLease && <Lease form={form} />}

			{/* Loan Form */}
			{watchedOptionalSections?.addLoan && <Loan form={form} />}
		</div>
	);
};

export default OptionalSections;
