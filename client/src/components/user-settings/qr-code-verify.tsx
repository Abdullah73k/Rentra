import type { twoFactorData } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";
import TextInput from "../form/text-input";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import QRCode from "react-qr-code";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const qrSchema = z.object({
  token: z.string().length(6),
});

type QrForm = z.infer<typeof qrSchema>;

const QRCodeVerify = ({
  totpURI,
  backupCodes,
  onDone,
}: NonNullable<twoFactorData> & { onDone: () => void }) => {
  const [successfullyEnabled, setSuccessfullyEnabled] = useState(false);
  const form = useForm<QrForm>({
    resolver: zodResolver(qrSchema),
    defaultValues: {
      token: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleQrCodeVerify(data: QrForm) {
    await authClient.twoFactor.verifyTotp(
      {
        code: data.token,
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to verify code");
        },
        onSuccess: () => {
          setSuccessfullyEnabled(true);
        },
      }
    );
  }

  if (successfullyEnabled) {
    return (
      <>
        <p className="text-sm text-muted-foreground mb-2">
          Save these backup codes in a safe place. You can use them to access
          your account.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {backupCodes.map((code, index) => (
            <div key={index} className="font-mono text-sm">
              {code}
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={onDone}>
          Done
        </Button>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Scan QR code with your authenticator app and enter the code below:
      </p>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleQrCodeVerify)}>
          <TextInput form={form} name="token" label="Code" />
          <Button
            type="submit"
            className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
            disabled={isSubmitting}
          >
            <LoadingSwap isLoading={isSubmitting}>Submit Code</LoadingSwap>
          </Button>
        </form>
      </Form>
      <div className="p-4 bg-white w-fit">
        <QRCode size={256} value={totpURI} />
      </div>
    </div>
  );
};

export default QRCodeVerify;
