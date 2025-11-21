import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PasswordInput from "@/components/form/PasswordInput";
import EmailInput from "@/components/form/EmailInput";
import OauthButton from "@/components/form/OauthButton";
import Github from "@/assets/svg/Github";
import Google from "@/assets/svg/Google";
import Discord from "@/assets/svg/Discord";

const SignUpPage: React.FC = () => {
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

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
              Create account
            </h1>
            <p className="text-sm text-gray-600">
              Join us and start your journey today
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="fullname"
                className="text-xs font-medium uppercase tracking-wide text-gray-600"
              >
                Full Name
              </label>
              <Input
                id="fullname"
                type="text"
                placeholder="John Doe"
                className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
              />
            </div>

            <EmailInput />
            <PasswordInput />
            <PasswordInput confirmPass />

            <div className="space-y-2">
              <label
                htmlFor="country"
                className="text-xs font-medium uppercase tracking-wide text-gray-600"
              >
                Country
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-lg border-gray-300 w-full text-sm ">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ae">United Arab Emirates</SelectItem>
                  <SelectItem value="sa">Saudi Arabia</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="it">Italy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="currency"
                  className="text-xs font-medium uppercase tracking-wide text-gray-600"
                >
                  Currency
                </label>
                <Select>
                  <SelectTrigger className="h-12 rounded-lg border-gray-300 bg-white text-sm">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AED">AED (د.إ)</SelectItem>
                    <SelectItem value="SAR">SAR (ر.س)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                    <SelectItem value="AUD">AUD (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="vat-rate"
                  className="text-xs font-medium uppercase tracking-wide text-gray-600"
                >
                  VAT Rate (%)
                </label>
                <Input
                  id="vat-rate"
                  type="number"
                  placeholder="5"
                  min="0"
                  max="100"
                  step="0.01"
                  className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
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
            >
              CREATE ACCOUNT
            </Button>
          </form>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-xs uppercase tracking-widest text-gray-400">
                or sign up with
              </span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="flex gap-3">
              <OauthButton>
                <Google />
                Google
              </OauthButton>
              <OauthButton>
                <Github /> Github
              </OauthButton>
              <OauthButton>
                <Discord /> Discord
              </OauthButton>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-black hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
