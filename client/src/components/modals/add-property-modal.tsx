import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Property from "../add-property-modal/property";
import PropertyInfo from "../add-property-modal/property-info";
import { buildPropertyFromForm } from "@/lib/build-property-from-form";
import OptionalSections from "../add-property-modal/optional-sections";
import { Form } from "../ui/form";
import { z } from "zod";
import { propertyDataSchema as schema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ADD_PROPERTY_DEFAULT_VALUES } from "@/constants/form.constants";
import { useMutation } from "@tanstack/react-query";
import { createNewProperty } from "@/utils/http";
import { useAuthStore } from "@/stores/auth.store";

export type FormFields = z.infer<typeof schema>;
interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);

  const session = useAuthStore((s) => s.session);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: ADD_PROPERTY_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (session?.user.id) {
      form.setValue("property.userId", session.user.id, {
        shouldValidate: true,
      });
    }
  }, [session?.user.id, form]);

  const { mutate } = useMutation({
    mutationFn: createNewProperty,
  });

  const handleSave = async () => {
    const isValid = await form.trigger();
    console.log(form.getValues());

    console.log(isValid);

    if (!isValid) return;

    const values = form.getValues();
    try {
      const property = buildPropertyFromForm(values);
      console.log(property); // TODO: remove when getting ready for production

      mutate(property);
    } catch (error) {
      console.error(error);
      window.alert(
        "An unexpected error occurred while saving the property. Please try again." // TODO: switch to toast component
      );
    }
    onClose()
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

export default AddPropertyModal;
