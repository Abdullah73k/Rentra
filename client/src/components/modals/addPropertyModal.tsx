import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Property from "../addPropertyModal/Property";
import PropertyInfo from "../addPropertyModal/PropertyInfo";
import type { AddPropertyFormData } from "@/lib/types";
import { INITIAL_FORM_DATA } from "@/constants/form.constants";
import { buildPropertyFromForm } from "@/lib/buildPropertyFromForm";
import OptionalSections from "../addPropertyModal/OptionalSections";
import { Form } from "../ui/form";
import { z } from "zod";
import {
  LeaseSchema,
  LoanSchema,
  OptionalSectionsSchema,
  PropertyInfoSchema,
  PropertySchema,
  TenantSchema,
} from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  property: PropertySchema,
  propertyInfo: PropertyInfoSchema,
  optionalSections: OptionalSectionsSchema,
  tenant: TenantSchema.optional(),
  lease: LeaseSchema.optional(),
  loan: LoanSchema.optional(),
});

export type FormFields = z.infer<typeof schema>;
interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  // keep `any` here so you can wire it to your own Property type / DB schema later
  onSave: (property: any) => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] =
    useState<AddPropertyFormData>(INITIAL_FORM_DATA);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = () => {
    const property = buildPropertyFromForm(formData);
    onSave(property);
    setStep(1);
    setFormData(INITIAL_FORM_DATA);
  };

  const isStep1Valid =
    formData.purpose &&
    formData.type &&
    formData.address &&
    formData.country &&
    formData.acquisitionDate &&
    formData.valuationDate;

  const isStep2Valid =
    formData.propertyNumber && formData.bedrooms !== undefined;

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
          <form>
            <div className="py-4">
              {step === 1 && <Property form={form} />}

              {/* Step 2: PropertyInfo */}
              {step === 2 && <PropertyInfo form={form} />}

              {/* Step 3: Optional Sections */}
              {step === 3 && (
                <OptionalSections
                  formData={formData}
                  handleSelectChange={handleSelectChange}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
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
