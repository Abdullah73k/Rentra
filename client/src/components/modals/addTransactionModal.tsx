import React, { useState, useMemo, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { INITIAL_TRANSACTION_FORM } from "@/constants/form.constants";
import type {
  AddTransactionFormData,
  AddTransactionModalProps,
} from "@/lib/types";
import { buildTransactionFromForm } from "@/lib/buildTransactionFromForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TransactionTypeSelectField from "../form/TransactionTypeSelectField";
import { Form } from "../ui/form";
import TextInput from "../form/TextInput";
import PaymentMethodSelectField from "../form/PaymentMethodSelectField";

const schema = z.object({
  type: z.string(),
  subcategory: z.string(),
  amount: z.number(),
  currency: z.string(),
  taxRate: z.number().min(1).max(100),
  from: z.string(),
  to: z.string(),
  method: z.string(),
  date: z.string(),
  notes: z.string(),
});

type formFields = z.infer<typeof schema>;

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  propertyId,
}) => {
  const [formData, setFormData] = useState<AddTransactionFormData>(
    INITIAL_TRANSACTION_FORM
  );

  const form = useForm<formFields>({
    resolver: zodResolver(schema),
    defaultValues: INITIAL_TRANSACTION_FORM,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  const taxAmount = useMemo(() => {
    return (formData.amount * formData.taxRate) / 100;
  }, [formData.amount, formData.taxRate]);

  const handleSave = () => {
    const transaction = buildTransactionFromForm(
      formData,
      propertyId,
      taxAmount
    );
    onSave(transaction);
    setFormData(INITIAL_TRANSACTION_FORM);
  };

  const isValid = formData.subcategory && formData.amount > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TransactionTypeSelectField
                  form={form}
                  name="type"
                  label="Type *"
                />
                <TextInput
                  form={form}
                  name="subcategory"
                  label="Category *"
                  placeholder="e.g., Maintenance, Repair"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <TextInput
                  form={form}
                  name="amount"
                  label="Amount *"
                  placeholder="0"
                  type="number"
                />
                <TextInput
                  form={form}
                  name="currency"
                  label="Currency *"
                  placeholder="AED"
                />
                <TextInput
                  form={form}
                  name="taxRate"
                  label="Tax Rate (%) *"
                  placeholder="0"
                  type="number"
                />
              </div>
              {taxAmount > 0 && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Tax Amount: {formData.currency} {taxAmount.toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Total: {formData.currency}{" "}
                    {(formData.amount + taxAmount).toFixed(2)}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  form={form}
                  name="from"
                  label="From *"
                  placeholder="e.g., Bank Account"
                />
                <TextInput
                  form={form}
                  name="to"
                  label="To *"
                  placeholder="e.g., Vendor Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  form={form}
                  name="date"
                  label="Date *"
                  placeholder=""
                  type="date"
                />
                <PaymentMethodSelectField
                  form={form}
                  name="method"
                  label="Payment Method *"
                />
              </div>
              <TextInput
                form={form}
                name="notes"
                label="Notes"
                placeholder="Add any notes..."

              />
            </div>
          </form>
        </Form>

        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4"></div>

          <div className="grid grid-cols-3 gap-4"></div>

          <div className="grid grid-cols-2 gap-4"></div>

          <div className="grid grid-cols-2 gap-4"></div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add any notes..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
