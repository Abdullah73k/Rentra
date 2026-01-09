import TextInput from "../form/text-input";
import { usePropertyStore } from "@/stores/property.store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanSchema } from "@/lib/schemas";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { addOptionalData, queryClient } from "@/utils/http";

type FormType = z.input<typeof loanSchema>

const AddLoanModal = ({ propertyId }: { propertyId: string }) => {
    const isAddLoanOpen = usePropertyStore(s => s.isAddLoanOpen);
    const setIsAddLoanOpen = usePropertyStore(s => s.setIsAddLoanOpen);

    const form = useForm<FormType>({
        resolver: zodResolver(loanSchema),
    })

    const { mutate } = useMutation({
        mutationKey: ["add-loan"],
        mutationFn: (data: z.infer<typeof loanSchema>) =>
            addOptionalData("loan", data, propertyId),
        onSuccess: () => {
            setIsAddLoanOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["property", propertyId],
            })
        },
    });

    function handleAddLoan(data: FormType) {
        mutate(data as z.infer<typeof loanSchema>)
    }
    return (
        <Dialog open={isAddLoanOpen} onOpenChange={setIsAddLoanOpen}>
            <DialogContent>
                <AlertDialogHeader>
                    <DialogTitle>Add Loan</DialogTitle>
                </AlertDialogHeader>

                <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Loan Information</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddLoan)}>

                            <TextInput
                                form={form}
                                name={"lender"}
                                label="Lender *"
                                placeholder="Bank Name"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput
                                    form={form}
                                    name={"termMonths"}
                                    label="Term (Months) *"
                                    type="number"
                                />
                                <TextInput
                                    form={form}
                                    name={"monthlyPayment"}
                                    label="Monthly Payment *"
                                    type="number"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput
                                    form={form}
                                    name={"totalMortgageAmount"}
                                    label="Total Mortgage Amount *"
                                    type="number"
                                />
                                <TextInput
                                    form={form}
                                    name={"interestRate"}
                                    label="Interest Rate (%) *"
                                    type="number"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsAddLoanOpen(false)}>Cancel</Button>
                                <Button type="submit">Add Loan</Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default AddLoanModal;