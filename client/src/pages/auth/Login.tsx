import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OAuthButtons from "@/components/form/OAuthButtons";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/form/TextInput";
import CustomPasswordInput from "@/components/form/PasswordInput";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import { PasswordSchema } from "@/lib/schemas";
import PasskeyButton from "@/components/form/PasskeyButton";

const signInSchema = z.object({
  email: z.email(),
  password: PasswordSchema,
});

type SignInForm = z.infer<typeof signInSchema>;

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSignIn(data: SignInForm) {
    try {
      await authClient.signIn.email(
        {
          ...data,
          callbackURL: "/properties/dashboard",
        },
        {
          onError: (error) => {
            if (error.error.code === "EMAIL_NOT_VERIFIED") {
              navigate(`/auth/verify-email/${encodeURIComponent(data.email)}`);
            }
            toast.error(error?.error?.message ?? "Failed to sign In");
          },
          onSuccess: () => {},
        }
      );
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to sign In");
    }
  }

  // TODO: add check to see if user is already logged in and redirect if needed

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
              onSubmit={form.handleSubmit(handleSignIn)}
              className="space-y-6"
            >
              <TextInput
                form={form}
                label="Email"
                name="email"
                placeholder="you@example.com"
                type="email"
                autoComplete="email webauthn"
              />
              <CustomPasswordInput
                name="password"
                form={form}
                label="Password"
                placeholder="••••••••"
                autoComplete="current-password webauthn"
              />

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
              >
                <LoadingSwap isLoading={isSubmitting}>SIGN IN</LoadingSwap>
              </Button>
            </form>
          </Form>

          <PasskeyButton />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-xs uppercase tracking-widest text-gray-400">
                or continue with
              </span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="flex gap-3">
              <OAuthButtons />
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/signup"
              className="font-medium text-black hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
