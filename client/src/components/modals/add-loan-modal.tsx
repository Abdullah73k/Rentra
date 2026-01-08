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

type FormType = z.input<typeof loanSchema>

const AddLoanModal = () => {
    const isAddLoanOpen = usePropertyStore(s => s.isAddLoanOpen);
    const setIsAddLoanOpen = usePropertyStore(s => s.setIsAddLoanOpen);

    const form = useForm<FormType>({
        resolver: zodResolver(loanSchema),
    })

    function handleAddLoan() {
        console.log(form.getValues())
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
                            <Button type="button" variant="outline" onClick={() => setIsAddLoanOpen(false)}>Cancel</Button>
                            <Button type="submit">Add Loan</Button>
                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default AddLoanModal;