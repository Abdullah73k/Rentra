import CustomPasswordInput from "@/components/form/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordSchema } from "@/lib/schemas";
import { authClient } from "@/utils/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: PasswordSchema,
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleResetPassword(data: ResetPasswordForm) {
    try {
      if (token == null) return;
      await authClient.resetPassword(
        {
          newPassword: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Password reset successful", {
              description: "Redirecting to login...",
            });
            setTimeout(() => {
              navigate("/auth/login");
            }, 1000);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to reset password");
    }
  }

  if (token == null || error != null) {
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
                Invalid Reset Link
              </h1>
              <p>The password reset link is invalid or has expired.</p>

              <Button>
                <NavLink to="/auth/login">Back to login</NavLink>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
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
              Reset Password
            </h1>
          </div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleResetPassword)}
            >
              <CustomPasswordInput
                form={form}
                name="password"
                label="Password"
                placeholder="••••••••"
              />

              <Button
                type="submit"
                className="h-12 w-full bg-black text-sm font-medium text-white hover:bg-black/90"
                disabled={isSubmitting}
              >
                <LoadingSwap isLoading={isSubmitting}>
                  Reset Password
                </LoadingSwap>
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
