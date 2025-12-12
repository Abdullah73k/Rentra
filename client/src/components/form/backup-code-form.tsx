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

const BackupCodeSchema = z.object({
  code: z.string().min(1),
});

type BackupForm = z.infer<typeof BackupCodeSchema>;

const BackupCodeForm = () => {
  const navigate = useNavigate();
  const form = useForm<BackupForm>({
    resolver: zodResolver(BackupCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleBackupCodeVerification(data: BackupForm) {
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
    <div className="min-h-screen bg-[#f8f8f8]">
      <main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center px-6">
        <div
          className="absolute right-[10%] top-[20%] h-[300px] w-[300px] animate-pulse rounded-full bg-linear-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-light tracking-tight">Welcome back</h1>
            <p className="text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleBackupCodeVerification)}
              className="space-y-6"
            >
              <TextInput form={form} label="Backup Code" name="code" />

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

export default BackupCodeForm;
