import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import TextInput from "../form/TextInput";
import { type Passkey } from "better-auth/plugins/passkey";
import { LoadingSwap } from "../ui/loading-swap";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import BetterAuthActionButton from "../form/BetterAuthActionButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const passkeySchema = z.object({
  name: z.string().min(1),
});

type PasskeyForm = z.infer<typeof passkeySchema>;

const PasskeyManagement = ({ passkeys }: { passkeys: Passkey[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const form = useForm<PasskeyForm>({
    resolver: zodResolver(passkeySchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleAddPasskey(data: PasskeyForm) {
    await authClient.passkey.addPasskey(data, {
      onError: (error) => {
        toast.error(error.error.message || "Failed to add passkey");
      },
      onSuccess: () => {
        navigate(0);
        setIsDialogOpen(false);
      },
    });
  }

  function handleDeletePasskey(passkeyId: string) {
    return authClient.passkey.deletePasskey(
      { id: passkeyId },
      {
        onSuccess: () => {
          navigate(0);
        },
      }
    );
  }

  return (
    <div className="space-y-4">
      {passkeys.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No passkeys yet</CardTitle>
            <CardDescription>
              Add your first passkey for secure, passwordless authentication
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-2">
          {passkeys.map((passkey) => (
            <Card key={passkey.id}>
              <CardHeader className="flex gap-2 items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{passkey.name}</CardTitle>
                  <CardDescription>
                    Created {new Date(passkey.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <BetterAuthActionButton
                  requireAreYouSure
                  variant="destructive"
                  size="icon"
                  action={() => handleDeletePasskey(passkey.id)}
                >
                  <Trash2 />
                </BetterAuthActionButton>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(o) => {
          if (o) form.reset();
          setIsDialogOpen(o);
        }}
      >
        <DialogTrigger asChild>
          <Button className="gap-2 rounded-full">
            <Key className="h-4 w-4" />
            New Passkey
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new passkey</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Create a new passkey for secure, passwordless authentication
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(handleAddPasskey)}
            >
              <TextInput form={form} name="name" label="Name" />
              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
                disabled={isSubmitting}
              >
                <LoadingSwap isLoading={isSubmitting}>
                  Add new passkey
                </LoadingSwap>
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PasskeyManagement;
