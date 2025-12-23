import { Key, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import type { Account, Session, twoFactorData } from "@/lib/types";
import { authClient } from "@/utils/auth-client";
import { useEffect, useState } from "react";
import SetPasswordSchema from "./set-password-schema";
import ChangePasswordForm from "./change-password-form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { PasswordSchema } from "@/lib/schemas";
import CustomPasswordInput from "../form/password-input";
import { LoadingSwap } from "../ui/loading-swap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import QRCodeVerify from "./qr-code-verify";
import { type Passkey } from "better-auth/plugins/passkey";
import PasskeyManagement from "./passkey-management";

const twoFactorAuthSchema = z.object({
  password: PasswordSchema,
});

type twoFactorAuthForm = z.infer<typeof twoFactorAuthSchema>;

const SecurityTab = ({ session }: { session: Session }) => {
  const [passkeys, setPasskeys] = useState<Passkey[]>([]);
  const isTwoFactorEnabled = session?.user.twoFactorEnabled;
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account>([]);
  const [twoFactorData, setTwoFactorData] = useState<twoFactorData>(null);

  const form = useForm<twoFactorAuthForm>({
    resolver: zodResolver(twoFactorAuthSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    let isMounted = true;
    const loadAccounts = async () => {
      const { data } = await authClient.listAccounts();
      if (isMounted) {
        setAccounts(data ?? []);
      }
    };
    loadAccounts();
    return () => {
      isMounted = false;
    };
  }, [session]);

  useEffect(() => {
    let isMounted = true;
    const loadPasskeys = async () => {
      const { data: passkeys } = await authClient.passkey.listUserPasskeys();
      if (isMounted) {
        setPasskeys(passkeys ?? []);
      }
    };
    loadPasskeys();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleEnableTwoFactorAuth(data: twoFactorAuthForm) {
    const res = await authClient.twoFactor.enable({
      password: data.password,
    });

    if (res.error) {
      toast.error(res.error.message || "Failed to enable 2FA");
      return;
    } else {
      setTwoFactorData(res.data);
      form.reset();
    }
  }

  async function handleDisableTwoFactorAuth(data: twoFactorAuthForm) {
    await authClient.twoFactor.disable(
      {
        password: data.password,
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to disable 2FA");
        },
        onSuccess: () => {
          form.reset();
          navigate(0);
        },
      }
    );
  }

  if (twoFactorData != null) {
    return (
      <QRCodeVerify
        {...twoFactorData}
        onDone={() => {
          setTwoFactorData(null);
        }}
      />
    );
  }

  if (!session) return <LoadingSwap isLoading={true} children={undefined} />;

  if (accounts === null)
    return <LoadingSwap isLoading={true} children={undefined} />;

  const hasPasswordAccount = accounts.some(
    (a) => a.providerId === "credential"
  );

  const { user: userInfo } = session;

  const { isSubmitting } = form.formState;

  return (
    <>
      <div className="space-y-6">
        {/* Password Reset */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Password</CardTitle>
            </div>
            {!hasPasswordAccount ? (
              <SetPasswordSchema userInfo={userInfo} />
            ) : (
              <ChangePasswordForm />
            )}
          </CardHeader>
        </Card>

        {/* Two-Factor Authentication */}
        {hasPasswordAccount && (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                <Badge variant={isTwoFactorEnabled ? "default" : "secondary"}>
                  {isTwoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(
                    isTwoFactorEnabled
                      ? handleDisableTwoFactorAuth
                      : handleEnableTwoFactorAuth
                  )}
                >
                  <CustomPasswordInput
                    form={form}
                    name="password"
                    label="Password"
                  />

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
                    disabled={isSubmitting}
                  >
                    <LoadingSwap isLoading={isSubmitting}>
                      {isTwoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                    </LoadingSwap>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Passkeys */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Passkeys</CardTitle>
                </div>
                <CardDescription>
                  Manage your passkeys for passwordless authentication
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PasskeyManagement passkeys={passkeys} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SecurityTab;
