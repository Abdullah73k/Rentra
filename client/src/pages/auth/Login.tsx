import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EmailInput from "@/components/form/EmailInput";
import OauthButton from "@/components/form/OauthButton";
import Google from "@/assets/svg/Google";
import Github from "@/assets/svg/Github";
import Discord from "@/assets/svg/Discord";

const SignInPage: React.FC = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

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

          <form className="space-y-6">
            <EmailInput />
            {/* TODO: add password input */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked: boolean) =>
                    setRememberMe(checked === true)
                  }
                  className="border-gray-300"
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
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
              SIGN IN
            </Button>
          </form>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-xs uppercase tracking-widest text-gray-400">
                or continue with
              </span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="flex gap-3">
              <OauthButton provider="google">
                <Google />
                Google
              </OauthButton>
              <OauthButton provider="github">
                <Github /> Github
              </OauthButton>
              <OauthButton provider="discord">
                <Discord /> Discord
              </OauthButton>
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
