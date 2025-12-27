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
import { patchPropertySchema as schema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { createNewTransaction } from "@/utils/http";
import { toast } from "sonner";
import Property from "../add-property-modal/property";
import PropertyInfo from "../add-property-modal/property-info";
import OptionalSections from "../add-property-modal/optional-sections";
import { ChevronRight } from "lucide-react";

type FormFields = z.infer<typeof schema>;

type props = {
	isOpen: boolean;
	onClose: () => void;
	property: FormFields;
};

const EditPropertyModal = ({ isOpen, onClose, property }: props) => {
	const form = useForm<FormFields>({
		resolver: zodResolver(schema),
		defaultValues: property,
	});

	const { mutate } = useMutation({
		mutationFn: createNewTransaction,
		onSuccess: () => {
			onClose();
		},
		onError: () => {
			toast.error("Failed to add transaction, please try again");
		},
	});

	const handleSave = () => {};

	const isValid = form.formState.isValid;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
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
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-2">
            {step < 3 && (
              <Button
                onClick={() => setStep((prev) => prev + 1)}
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};

export default EditPropertyModal;
