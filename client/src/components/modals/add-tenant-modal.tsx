import { useForm } from "react-hook-form";
import TextInput from "../form/text-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantSchema } from "@/lib/schemas";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { usePropertyStore } from "@/stores/property.store";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { addOptionalData, queryClient } from "@/utils/http";

type FormType = z.infer<typeof tenantSchema>;

const AddTenantModal = ({ propertyId }: { propertyId: string }) => {
  const isAddTenantOpen = usePropertyStore((s) => s.isAddTenantOpen);
  const setIsAddTenantOpen = usePropertyStore((s) => s.setIsAddTenantOpen);

  const form = useForm<FormType>({
    resolver: zodResolver(tenantSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["add-tenant"],
    mutationFn: (data: z.infer<typeof tenantSchema>) =>
      addOptionalData("tenant", data, propertyId),
    onSuccess: () => {
      setIsAddTenantOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["property", propertyId],
      });
    },
  });

  function handleAddTenant(data: FormType) {
    mutate(data);
  }
  return (
    <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Tenant</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 border-b pb-6">
          <h3 className="font-semibold text-foreground">Tenant Information</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddTenant)}
              className="space-y-4"
            >
              <TextInput
                form={form}
                name={"name"}
                label="Name *"
                placeholder="John Doe"
              />
              <TextInput
                form={form}
                name={"phone"}
                label="Phone"
                placeholder="+1 (555) 123-4567"
              />
              <TextInput
                form={form}
                name={"email"}
                label="Email *"
                placeholder="john@example.com"
                type="email"
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddTenantOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Tenant</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTenantModal;
