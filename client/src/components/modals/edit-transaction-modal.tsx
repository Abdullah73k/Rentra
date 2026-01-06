import { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "@/constants/form.constants";
import { buildEditTransactionFromForm } from "@/lib/build-edit-transaction-from-form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import TextInput from "../form/text-input";
import SelectField from "../form/select-field";
import NotesInput from "../form/notes-input";
import { patchTransactionSchema as schema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { editTransaction, queryClient } from "@/utils/http";
import { CURRENCY_OPTIONS } from "@/constants/auth.constants";
import DateInput from "../form/date-input";
import { toast } from "sonner";
import { usePropertyStore } from "@/stores/property.store";

type FormFields = z.input<typeof schema>;

const EditTransactionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const transaction = usePropertyStore((s) => s.currentTransaction);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...transaction,
      fxRateToBase: String(transaction?.fxRateToBase || "1"),
      taxAmount: String(transaction?.taxAmount || "0"),
      taxRate: String(transaction?.taxRate || "0"),
      amount: String(transaction?.amount || "0"),
      // Handle potential nulls from backend for optional string fields
      notes: transaction?.notes || "",
      subcategory: transaction?.subcategory || "",
      leaseId: transaction?.leaseId || undefined,
    },
  });

  const { mutate } = useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["property", transaction?.propertyId],
      });
      onClose();
    },
    onError: () => {
      toast.error("Failed to edit transaction, please try again");
    },
  });

  useEffect(() => {
    if (!transaction) return;

    form.reset({
      ...transaction,
      fxRateToBase: String(transaction.fxRateToBase || "1"),
      taxAmount: String(transaction.taxAmount || "0"),
      taxRate: String(transaction.taxRate || "0"),
      amount: String(transaction.amount || "0"),
      // Handle potential nulls from backend for optional string fields
      notes: transaction.notes || "",
      subcategory: transaction.subcategory || "",
      leaseId: transaction.leaseId || undefined,
    });
  }, [transaction, form]);

  const formData = form.watch();

  const taxAmount = useMemo(() => {
    const amount = parseFloat(String(formData.amount)) || 0;
    const rate = parseFloat(formData.taxRate) || 0;
    return (amount * rate) / 100;
  }, [formData.amount, formData.taxRate]);

  useEffect(() => {
    form.setValue("taxAmount", taxAmount.toFixed(2), { shouldValidate: true });
  }, [taxAmount, form]);

  const handleSave = () => {
    const transaction = buildEditTransactionFromForm(form.getValues(), taxAmount);
    mutate(transaction);
    form.reset();
  };

  const isValid = form.formState.isValid;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  form={form}
                  name="type"
                  label="Type *"
                  options={TRANSACTION_TYPES}
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
                  type="decimal"
                />
                <SelectField
                  form={form}
                  name="currency"
                  label="Currency *"
                  options={CURRENCY_OPTIONS}
                />
                <TextInput
                  form={form}
                  name="taxRate"
                  label="Tax Rate (%) *"
                  placeholder="0"
                  type="decimal"
                />
              </div>
              {taxAmount > 0 && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Tax Amount: {formData.currency} {taxAmount.toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Total: {formData.currency}{" "}
                    {(parseFloat(String(formData.amount)) + taxAmount).toFixed(
                      2
                    )}
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
                <DateInput form={form} name="date" label="Date *" />
                <SelectField
                  form={form}
                  name="method"
                  label="Payment Method *"
                  options={PAYMENT_METHODS}
                />
              </div>
              <NotesInput form={form} name="notes" />
            </div>
          </form>
        </Form>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!isValid} onClick={handleSave}>
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionModal;
