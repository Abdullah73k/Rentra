import type { twoFactorData } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";
import TextInput from "../form/TextInput";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import { QrCode } from "lucide-react";

const qrSchema = z.object({
  token: z.string().length(6),
});

type QrForm = z.infer<typeof qrSchema>;

const QRCodeVerify = ({
  totpURI,
  backupCodes,
  onDone,
}: NonNullable<twoFactorData> & { onDone: () => void }) => {
  const form = useForm<QrForm>({
    resolver: zodResolver(qrSchema),
    defaultValues: {
      token: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleQrCodeVerify(data: QrForm) {}

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Scan QR code with your authenticator app and enter the code below:
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleQrCodeVerify)}>
          <TextInput form={form} name="token" label="Token" />
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
        <QrCode size={256} values={totpURI} />
      </div>
    </div>
  );
};

export default QRCodeVerify;
