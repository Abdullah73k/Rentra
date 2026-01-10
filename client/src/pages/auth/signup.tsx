import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordInput from "@/components/form/password-input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/form/text-input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import VatInput from "@/components/form/vat-input";
import SelectField from "@/components/form/select-field";
import { COUNTRY_OPTIONS, CURRENCY_OPTIONS } from "@/constants/auth.constants";
import OAuthButtons from "@/components/form/o-auth-buttons";
import { PasswordSchema } from "@/lib/schemas";
import { motion } from "motion/react";

const signupSchema = z
  .object({
    fullName: z.string().min(1),
    email: z.email(),
    password: PasswordSchema,
    ConfirmPassword: PasswordSchema,
    country: z.string(),
    currency: z.string(),
    vatRate: z.coerce.number<number>(),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      ConfirmPassword: "",
      currency: "",
      country: "",
      vatRate: 0,
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSignup(data: SignupForm) {
    try {
      const res = await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.fullName,
          country: data.country,
          currency: data.currency,
          vatProfile: data.vatRate,
          callbackURL: "/properties/dashboard",
        },
        {
          onError: (error) => {
            toast.error(error?.error?.message ?? "Failed to sign up");
          },
          onSuccess: () => { },
        }
      );

      if (res.error == null && !res.data.user.emailVerified) {
        navigate(`/auth/verify-email/${encodeURIComponent(data.email)}`);
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to sign up");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="min-h-screen bg-[#f8f8f8]">
        <main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center px-6">
          <div
            className="absolute right-[10%] top-[20%] h-[300px] w-[300px] animate-pulse rounded-full bg-linear-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-70 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl font-light tracking-tight">
                Create account
              </h1>
              <p className="text-sm text-gray-600">
                Join us and start your journey today
              </p>
            </div>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(handleSignup)}
              >
                <TextInput
                  form={form}
                  name="fullName"
                  label="Full Name"
                  placeholder="John Doe"
                />
                <TextInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="you@exmaple.com"
                />
                <PasswordInput
                  form={form}
                  name="password"
                  label="password"
                />
                <PasswordInput
                  form={form}
                  name="ConfirmPassword"
                  label="Confirm Password"
                />
                <SelectField
                  form={form}
                  name="country"
                  label="Country"
                  placeholder="Select your country"
                  options={COUNTRY_OPTIONS}
                />

                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    form={form}
                    name="currency"
                    label="Currency"
                    placeholder="Select your currency"
                    options={CURRENCY_OPTIONS}
                  />

                  <VatInput
                    form={form}
                    name="vatRate"
                    label="Vat Rate %"
                    placeholder="5"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) =>
                      setAgreeToTerms(checked === true)
                    }
                    className="mt-0.5 border-gray-300"
                  />
                  <label
                    htmlFor="terms"
                    className="cursor-pointer text-sm text-gray-600"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-black hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-black hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
                  disabled={isSubmitting}
                >
                  <LoadingSwap isLoading={isSubmitting}>
                    CREATE ACCOUNT
                  </LoadingSwap>
                </Button>
              </form>
            </Form>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  or sign up with
                </span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <div className="flex gap-3 justify-center">
                <OAuthButtons />
              </div>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-black hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
