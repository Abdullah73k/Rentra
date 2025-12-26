import React, { useState, useMemo } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	INITIAL_TRANSACTION_FORM,
	PAYMENT_METHODS,
	TRANSACTION_TYPES,
} from "@/constants/form.constants";
import type { Transaction, AddTransactionModalProps } from "@/lib/types";
import { buildTransactionFromForm } from "@/lib/build-transaction-from-form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import TextInput from "../form/text-input";
import SelectField from "../form/select-field";
import NotesInput from "../form/notes-input";
import { transactionSchema as schema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { createNewTransaction } from "@/utils/http";
import { CURRENCY_OPTIONS } from "@/constants/auth.constants";
import DateInput from "../form/date-input";

type FormFields = z.infer<typeof schema>;

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
	isOpen,
	onClose,
	propertyId,
}) => {
	const [formData, setFormData] = useState<Transaction>(
		INITIAL_TRANSACTION_FORM
	);

	const form = useForm<FormFields>({
		resolver: zodResolver(schema),
		defaultValues: INITIAL_TRANSACTION_FORM,
	});

	const { mutate } = useMutation({
		mutationFn: createNewTransaction,
		onSuccess: () => {
			onClose();
		},
	});

	const taxAmount = useMemo(() => {
		return (parseFloat(formData.amount) * parseFloat(formData.taxRate)) / 100;
	}, [formData.amount, formData.taxRate]);

	const handleSave = () => {
		const transaction = buildTransactionFromForm(
			formData,
			propertyId,
			taxAmount
		);
		mutate(transaction);
		setFormData(INITIAL_TRANSACTION_FORM);
	};

	// const isValid = !!formData.subcategory && parseFloat(formData.amount) > 0;

  const isValid = true;

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
										{(parseFloat(formData.amount) + taxAmount).toFixed(2)}
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
							<Button type="submit" disabled={!isValid} onClick={handleSave}>
								Save Transaction
							</Button>
						</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddTransactionModal;
