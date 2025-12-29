import { PROPERTY_PURPOSES, PROPERTY_TYPES } from "@/constants/form.constants";
import TextInput from "../form/text-input";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import DateInput from "../form/date-input";
import SelectField from "../form/select-field";
import { COUNTRY_OPTIONS, CURRENCY_OPTIONS } from "@/constants/auth.constants";

type PropertyProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
};

const Property = <T extends FieldValues>({ form }: PropertyProps<T>) => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<SelectField
					form={form}
					name={"property.purpose" as Path<T>}
					label="Purpose *"
					placeholder="Select purpose"
					options={PROPERTY_PURPOSES}
				/>
				<SelectField
					form={form}
					name={"property.type" as Path<T>}
					label="Type *"
					placeholder="Select type"
					options={PROPERTY_TYPES}
				/>
			</div>
			<TextInput
				form={form}
				name={"property.address" as Path<T>}
				label="Address *"
				placeholder="123 Main Street, Apt 4B"
			/>

			<div className="grid grid-cols-2 gap-4">
				<SelectField
					form={form}
					name={"property.country" as Path<T>}
					label="Country *"
					placeholder="United Arab Emirates"
					options={COUNTRY_OPTIONS}
				/>
				<SelectField
					form={form}
					name={"property.currency" as Path<T>}
					label="Currency *"
					placeholder="AED"
					options={CURRENCY_OPTIONS}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<TextInput
					form={form}
					name={"property.purchasePrice" as Path<T>}
					label="Purchase Price *"
					placeholder="0"
					type="decimal"
				/>
				<TextInput
					form={form}
					name={"property.closingCosts" as Path<T>}
					label="Closing Costs *"
					placeholder="0"
					type="decimal"
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<DateInput
					form={form}
					name={"property.acquisitionDate" as Path<T>}
					label="Acquisition Date *"
				/>
				<DateInput
					form={form}
					name={"property.valuationDate" as Path<T>}
					label="Valuation Date *"
				/>
				{/* TODO: add a photo input here */}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<TextInput
					form={form}
					name={"property.currentValue" as Path<T>}
					label="Current Value *"
					placeholder="0"
					type="decimal"
				/>
				<SelectField
					form={form}
					name={"property.sold" as Path<T>}
					label="Sold *"
					placeholder="Select"
					options={[
						{ label: "Yes", value: true },
						{ label: "No", value: false },
					]}
				/>
			</div>
		</div>
	);
};

export default Property;
