import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { patchPropertyDataSchema as schema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { editPropertyInfo } from "@/utils/http";
import { toast } from "sonner";
import Property from "../add-property-modal/property";
import PropertyInfo from "../add-property-modal/property-info";
import OptionalSections from "../add-property-modal/optional-sections";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { usePropertyStore } from "@/stores/property.store";
import { buildEditPropertyFromForm } from "@/lib/build-edit-property-from-form";

export type EditPropertyFormFields = z.infer<typeof schema>;

type props = {
	property: Omit<EditPropertyFormFields, "optionalSections">;
};

const EditPropertyModal = ({ property }: props) => {
	const isOpen = usePropertyStore((s) => s.isEditPropertyOpen);
	const setIsEditPropertyOpen = usePropertyStore(
		(s) => s.setIsEditPropertyOpen
	);
	const step = usePropertyStore((s) => s.editPropertyStep);
	const setStep = usePropertyStore((s) => s.setEditPropertyStep);

	const form = useForm<EditPropertyFormFields>({
		resolver: zodResolver(schema),
		defaultValues: {
			...property,
		},
	});

	const { mutate } = useMutation({
		mutationFn: editPropertyInfo,
		onSuccess: () => {
			setIsEditPropertyOpen(false);
		},
		onError: () => {
			toast.error("Failed to add transaction, please try again");
		},
	});

	const session = useAuthStore((s) => s.session);

	useEffect(() => {
		if (session?.user.id) {
			form.setValue("property.userId", session.user.id, {
				shouldValidate: true,
			});
		}
	}, [session?.user.id, form]);

	const handleSave = async () => {
		const isValid = await form.trigger();
		console.log(form.getValues());

		console.log(isValid);

		if (!isValid) return;

		const values = form.getValues();
		try {
			const property = buildEditPropertyFromForm(values);
			console.log(property); // TODO: remove when getting ready for production

			mutate(property);
		} catch (error) {
			console.error(error);
			window.alert(
				"An unexpected error occurred while saving the property. Please try again." // TODO: switch to toast component
			);
		}
		setIsEditPropertyOpen(false);
	};

	const watchedProperty = form.watch("property");
	const isStep1Valid =
		!!watchedProperty?.purpose &&
		!!watchedProperty?.type &&
		!!watchedProperty?.address &&
		!!watchedProperty?.country &&
		!!watchedProperty?.currency &&
		watchedProperty?.purchasePrice !== undefined &&
		watchedProperty?.closingCosts !== undefined &&
		watchedProperty?.currentValue !== undefined &&
		!!watchedProperty?.acquisitionDate;

	const watchedPropertyInfo = form.watch("propertyInfo");
	const isStep2Valid =
		!!watchedPropertyInfo?.propertyNumber &&
		watchedPropertyInfo?.bedrooms !== undefined &&
		watchedPropertyInfo?.bathrooms !== undefined &&
		watchedPropertyInfo?.sizeSqm !== undefined &&
		!!watchedPropertyInfo?.status &&
		!!watchedPropertyInfo?.furnishing;

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsEditPropertyOpen(false)}>
			<DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
				<DialogHeader>
					<DialogTitle>
						{step === 1 && "Add Property - Basic Information"}
						{step === 2 && "Add Property - Property Details"}
						{step === 3 && "Add Property - Optional Information"}
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSave)}>
						<div className="py-4">
							{step === 1 && <Property form={form} />}

							{/* Step 2: PropertyInfo */}
							{step === 2 && <PropertyInfo form={form} />}

							{/* Step 3: Optional Sections */}
							{step === 3 && <OptionalSections form={form} />}
						</div>
					</form>
				</Form>

				<DialogFooter className="flex justify-between">
					<Button
						variant="outline"
						onClick={() => setStep(Math.max(1, step - 1))}
						disabled={step === 1}
					>
						<ChevronLeft className="h-4 w-4 mr-2" />
						Back
					</Button>

					<div className="flex gap-2">
						{step < 3 && (
							<Button
								onClick={() => setStep(step + 1)}
								disabled={step === 1 && !isStep1Valid}
							>
								Next
								<ChevronRight className="h-4 w-4 ml-2" />
							</Button>
						)}
						{step === 3 && (
							<Button
								onClick={handleSave}
								disabled={!isStep1Valid || !isStep2Valid}
							>
								Save Property
							</Button>
						)}
						<Button
							variant="outline"
							onClick={() => setIsEditPropertyOpen(false)}
						>
							Cancel
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditPropertyModal;
