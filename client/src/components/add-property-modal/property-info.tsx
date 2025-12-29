import { FURNISHING_TYPES, PROPERTY_STATUS } from "@/constants/form.constants";
import TextInput from "../form/text-input";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import SelectField from "../form/select-field";
import NotesInput from "../form/notes-input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type PropertyInfoProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
};

const PropertyInfo = <T extends FieldValues>({
	form,
}: PropertyInfoProps<T>) => {
	const [currentLockerNum, setCurrentLockerNum] = useState("");
	const [lockerNumArray, setLockerNumArray] = useState<string[]>([]);

	useEffect(() => {
		form.setValue(
			"propertyInfo.lockerNumbers" as Path<T>,
			lockerNumArray as any
		);
	}, [lockerNumArray, form]);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<TextInput
					form={form}
					name={"propertyInfo.propertyNumber" as Path<T>}
					label="Property Number *"
					placeholder="4B"
				/>
				<SelectField
					form={form}
					name={"propertyInfo.status" as Path<T>}
					label="Status *"
					options={PROPERTY_STATUS}
				/>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<TextInput
					form={form}
					name={"propertyInfo.bedrooms" as Path<T>}
					label="Bedrooms *"
					type="number"
				/>
				<TextInput
					form={form}
					name={"propertyInfo.bathrooms" as Path<T>}
					label="Bathrooms *"
					type="decimal"
				/>
				<TextInput
					form={form}
					name={"propertyInfo.sizeSqm" as Path<T>}
					label="Size (sqm) *"
					type="decimal"
				/>
			</div>
			<SelectField
				form={form}
				name={"propertyInfo.furnishing" as Path<T>}
				label="Furnishing *"
				options={FURNISHING_TYPES}
			/>

			<TextInput
				form={form}
				name={"propertyInfo.parking" as Path<T>}
				label="Parking"
				placeholder="Covered Parking - Spot B12"
			/>

			{/* --- STYLED LOCKER SECTION START --- */}
			<div className="flex flex-col gap-3">
				<div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Locker Number(s)
				</div>

				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-4 space-y-4">
						{/* Input Group */}
						<div className="flex w-full items-center gap-2">
							<input
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								value={currentLockerNum}
								onChange={(e) => {
									setCurrentLockerNum(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										if (currentLockerNum) {
											setLockerNumArray((prev) => [...prev, currentLockerNum]);
											setCurrentLockerNum("");
										}
									}
								}}
								placeholder="Type locker number..."
							/>
							<Button
								type="button"
								variant="secondary"
								onClick={() => {
									if (!currentLockerNum) return;
									setLockerNumArray((prev) => [...prev, currentLockerNum]);
									setCurrentLockerNum("");
								}}
							>
								Add
							</Button>
						</div>

						{/* Tags Display Area */}
						{lockerNumArray.length > 0 && (
							<div className="flex flex-wrap gap-2 pt-2 border-t">
								{lockerNumArray.map((lockerNum, index) => (
									<div
										key={`${lockerNum}-${index}`}
										className="inline-flex items-center gap-2 rounded-full border border-transparent bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
									>
										<span>{lockerNum}</span>
										<button
											type="button"
											className="ml-1 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive focus:outline-none"
											onClick={() => {
												setLockerNumArray((prev) =>
													prev.filter((_, i) => i !== index)
												);
											}}
										>
											{/* Simple X icon using text to avoid new imports */}
											<span className="sr-only">Remove</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M18 6 6 18" />
												<path d="m6 6 12 12" />
											</svg>
										</button>
									</div>
								))}
							</div>
						)}

						{lockerNumArray.length === 0 && (
							<p className="text-[0.8rem] text-muted-foreground italic">
								No lockers added yet.
							</p>
						)}
					</div>
				</div>
			</div>

			<NotesInput form={form} name={"propertyInfo.notes" as Path<T>} />
		</div>
	);
};

export default PropertyInfo;
