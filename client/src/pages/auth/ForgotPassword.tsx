import TextInput from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/utils/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleForgotPassword(data: ForgotPasswordForm) {
    try {
      await authClient.requestPasswordReset(
        {
          ...data,
          redirectTo: "/auth/reset-password",
        },
        {
          onSuccess: () => {
            toast.success("Password reset email sent");
          },
        }
      );
    } catch (error) {
      toast.error("Failed to send password reset email");
    }
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
            <h1 className="text-5xl font-light tracking-tight">
              Forgot Password
            </h1>
          </div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleForgotPassword)}
            >
              <TextInput
                form={form}
                name="email"
                label="Email"
                placeholder="Test@example.com"
              />

              <div className="space-x-2 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/auth/login")}
                  className="h-12 font-medium"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="h-12 w-[80%] bg-black text-sm font-medium text-white hover:bg-black/90"
                  disabled={isSubmitting}
                >
                  <LoadingSwap isLoading={isSubmitting}>
                    Send Reset Email
                  </LoadingSwap>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
