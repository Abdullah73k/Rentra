import TextInput from "@/components/form/text-input";
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
      const res = await authClient.requestPasswordReset(
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
      console.log(res);
      
    } catch (error) {
      console.error(error);
      
      toast.error("Failed to send password reset email");
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <main className="relative flex items-center justify-center px-6">

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
                placeholder="you@example.com"
                type="email"
              />

              <div className="flex justify-between">
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
                  className="h-12 bg-black text-sm font-medium text-white hover:bg-black/90"
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
