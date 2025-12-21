import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/utils/auth-client";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { LoadingSwap } from "../ui/loading-swap";
import TextInput from "./text-input";
import { toast } from "sonner";

const totpSchema = z.object({
  code: z.string().length(6),
});

type TotpFormType = z.infer<typeof totpSchema>;

const TotpForm = () => {
  const navigate = useNavigate();
  const form = useForm<TotpFormType>({
    resolver: zodResolver(totpSchema),
    defaultValues: {
      code: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleTotpVerification(data: TotpFormType) {
    await authClient.twoFactor.verifyTotp(data, {
      onError: (error) => {
        toast.error(error.error.message || "Failed to verify code");
      },
      onSuccess: () => {
        navigate("/properties/dashboard");
      },
    });
  }

  return (
    <div className="bg-[#f8f8f8]">
      <main className="relative flex min-h-[calc(50vh-88px)] items-center justify-center px-6">
  

        <div className="relative w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-light tracking-tight">Enter your code</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleTotpVerification)}
              className="space-y-6"
            >
              <TextInput form={form} label="Code" name="code" />

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
              >
                <LoadingSwap isLoading={isSubmitting}>Verify</LoadingSwap>
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default TotpForm;
