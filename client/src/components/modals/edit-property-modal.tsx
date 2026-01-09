import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { patchPropertyDataSchema as schema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { editPropertyInfo, queryClient } from "@/utils/http";
import { toast } from "sonner";
import Property from "../add-property-modal/property";
import PropertyInfo from "../add-property-modal/property-info";
import OptionalSections from "../add-property-modal/optional-sections";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { usePropertyStore } from "@/stores/property.store";
import { buildEditPropertyFromForm } from "@/lib/build-edit-property-from-form";

export type EditPropertyFormFields = z.input<typeof schema>;

type props = {
  property: Omit<EditPropertyFormFields, "optionalSections">;
};

const EditPropertyModal = ({ property }: props) => {
  const session = useAuthStore((s) => s.session);
  const setLockerNumArray = usePropertyStore((s) => s.setLockerNumArray);
  const isOpen = usePropertyStore((s) => s.isEditPropertyOpen);
  const setIsEditPropertyOpen = usePropertyStore(
    (s) => s.setIsEditPropertyOpen
  );
  const step = usePropertyStore((s) => s.editPropertyStep);
  const setStep = usePropertyStore((s) => s.setEditPropertyStep);

  const form = useForm<EditPropertyFormFields>({
    resolver: zodResolver(schema) as Resolver<EditPropertyFormFields>,
    defaultValues: {
      ...property,
      property: {
        ...property.property,
        userId: property.property.userId || session?.user.id || "",
        photos: property.property.photos || [],
      },
      propertyInfo: {
        ...property.propertyInfo,
        propertyNumber: property.propertyInfo.propertyNumber || "",
        parking: property.propertyInfo.parking || undefined,
        notes: property.propertyInfo.notes || undefined,
        lockerNumbers: property.propertyInfo.lockerNumbers || [],
      },
      loan: property.loan || undefined,
      lease: property.lease || undefined,
      tenant: property.tenant || undefined,
      optionalSections: {
        addLease: !!property.lease,
        addTenant: !!property.tenant,
        addLoan: !!property.loan,
      },
    },
  });

  const { mutate } = useMutation({
    mutationFn: editPropertyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["property", property.property.id],
      });
      setIsEditPropertyOpen(false);
    },
    onError: () => {
      toast.error("Failed to edit property, please try again");
    },
  });

  useEffect(() => {
    if (session?.user.id) {
      form.setValue("property.userId", session.user.id, {
        shouldValidate: true,
      });
    }
  }, [session?.user.id, form]);

  useEffect(() => {
    setLockerNumArray(property.propertyInfo.lockerNumbers);
  }, [property.propertyInfo.lockerNumbers, setLockerNumArray]);

  const handleSave = async () => {
    const isValid = await form.trigger();

    if (!isValid) return;

    const values = form.getValues();
    try {
      const property = buildEditPropertyFromForm(values);

      mutate(property);
    } catch (error) {
      console.error(error);
      window.alert(
        "An unexpected error occurred while saving the property. Please try again." // TODO: switch to toast component
      );
    }
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
            {step === 1 && "Edit Property - Basic Information"}
            {step === 2 && "Edit Property - Property Details"}
            {step === 3 && "Edit Property - Optional Information"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
            <div className="py-4">
              {step === 1 && <Property form={form} />}

              {/* Step 2: PropertyInfo */}
              {step === 2 && <PropertyInfo form={form} />}

              {/* Step 3: Optional Sections */}
              {step === 3 && (
                <OptionalSections
                  form={form}
                  disabledOptions={{
                    addTenant: !property.tenant,
                    addLease: !property.lease,
                    addLoan: !property.loan,
                  }}
                />
              )}
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
