import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaseSchema } from "@/lib/schemas";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { usePropertyStore } from "@/stores/property.store";
import TextInput from "../form/text-input";
import SelectField from "../form/select-field";
import DateInput from "../form/date-input";
import { useMutation } from "@tanstack/react-query";
import { addOptionalData, queryClient } from "@/utils/http";

type FormType = z.input<typeof leaseSchema>;

const AddLeaseModal = ({ propertyId }: { propertyId: string }) => {
    const isAddLeaseOpen = usePropertyStore(s => s.isAddLeaseOpen);
    const setIsAddLeaseOpen = usePropertyStore(s => s.setIsAddLeaseOpen);

    const form = useForm<FormType>({
        resolver: zodResolver(leaseSchema),
    });

    const { mutate } = useMutation({
        mutationKey: ["add-lease"],
        mutationFn: (data: z.infer<typeof leaseSchema>) =>
            addOptionalData("lease", data, propertyId),
        onSuccess: () => {
            setIsAddLeaseOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["property", propertyId],
            })
        },
    });

    function handleAddLease(data: FormType) {
        mutate(data as z.infer<typeof leaseSchema>);
    }

    return (
        <Dialog open={isAddLeaseOpen} onOpenChange={setIsAddLeaseOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Lease</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 border-b pb-6">
                    <h3 className="font-semibold text-foreground">Lease Information</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddLease)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <DateInput
                                    form={form}
                                    name="start"
                                    label="Start Date *"
                                />
                                <DateInput
                                    form={form}
                                    name="end"
                                    label="End Date *"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <TextInput
                                    form={form}
                                    name="rentAmount"
                                    label="Rent Amount *"
                                    type="number"
                                />
                                <TextInput
                                    form={form}
                                    name="currency"
                                    label="Currency (3 chars) *"
                                    placeholder="USD"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <SelectField
                                    form={form}
                                    name="frequency"
                                    label="Frequency *"
                                    placeholder="Select Frequency"
                                    options={[
                                        "weekly",
                                        "bi-weekly",
                                        "monthly",
                                        "bi-monthly",
                                        "quarterly",
                                        "annually",
                                        "bi-annually",
                                    ]}
                                />
                                <TextInput
                                    form={form}
                                    name="paymentDay"
                                    label="Payment Day (1-31) *"
                                    type="number"
                                />
                            </div>

                            <TextInput
                                form={form}
                                name="deposit"
                                label="Deposit Amount *"
                                type="number"
                            />

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsAddLeaseOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Add Lease</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddLeaseModal;
