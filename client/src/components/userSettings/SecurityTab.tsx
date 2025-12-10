import { Key, Shield, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import type { Account, Session, twoFactorData, User } from "@/lib/types";
import { authClient } from "@/utils/auth-client";
import { useEffect, useState } from "react";
import SetPasswordSchema from "./SetPasswordSchema";
import ChangePasswordForm from "./ChangePasswordForm";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { PasswordSchema } from "@/lib/schemas";
import TextInput from "../form/TextInput";
import CustomPasswordInput from "../form/PasswordInput";
import { LoadingSwap } from "../ui/loading-swap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const twoFactorAuthSchema = z.object({
  password: PasswordSchema,
});

type twoFactorAuthForm = z.infer<typeof twoFactorAuthSchema>;

const SecurityTab = ({
  user,
  session,
  handleGeneratePasskey,
  handleToggle2FA,
  handleDeletePasskey,
}: {
  user: User;
  session: Session;
  handleGeneratePasskey: () => void;
  handleToggle2FA: () => void;
  handleDeletePasskey: (passkeyId: string) => void;
}) => {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState<Account>([]);
  const [twoFactorData, setTwoFactorData] = useState<twoFactorData>(null)

  const form = useForm<twoFactorAuthForm>({
    resolver: zodResolver(twoFactorAuthSchema),
    defaultValues: {},
  });

  async function handleEnableTwoFactorAuth(data: twoFactorAuthForm) {
    const res = await authClient.twoFactor.enable({
      password: data.password,
    });

    if(res.error) {
      toast.error(res.error.message || "Failed to enable 2FA")
    } {
      setTwoFactorData(res.data)
      form.reset()
    }
  }

  async function handleDisableTwoFactorAuth(data: twoFactorAuthForm) {
    await authClient.twoFactor.disable({
      password: data.password
    },
    {
      onError: (error) => {
        toast.error(error.error.message || "Failed to disable 2FA")
      },
        onSuccess: () => {
          form.reset(),
           navigate(".", { replace: true });
        }
      
    })

  }

  if(twoFactorData != null) {
    return <QRCodeVerify {...twoFactorData} onDone={() => {
      setTwoFactorData(null)
    }} />
  }

  if (!session) return null; // TODO: redirect to other page

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

  if (accounts === null) return; // TODO: redirect to other page

  const hasPasswordAccount = accounts.some(
    (a) => a.providerId === "credential"
  );

  const { user: userInfo } = session;

  const { isSubmitting } = form.formState;

  return (
    <>
      <div className="space-y-6">
        {/* Password Reset */}
        <Card>
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                <Badge
                  variant={user.twoFactorEnabled ? "default" : "secondary"}
                >
                  {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(user.twoFactorEnabled ? handleEnableTwoFactorAuth : handleDisableTwoFactorAuth)}>
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
                      {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </LoadingSwap>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Passkeys */}
        <Card>
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
              <Button
                onClick={handleGeneratePasskey}
                className="gap-2 rounded-full"
              >
                <Key className="h-4 w-4" />
                Generate Passkey
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {user.passkeys.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No passkeys configured</p>
                <p className="text-xs mt-1">
                  Generate a passkey to enable passwordless authentication
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {user.passkeys.map((passkey) => (
                  <div
                    key={passkey.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary rounded-full">
                        <Key className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{passkey.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Created{" "}
                          {new Date(passkey.createdAt).toLocaleDateString()}
                        </p>
                        {passkey.lastUsed && (
                          <p className="text-xs text-muted-foreground">
                            Last used{" "}
                            {new Date(passkey.lastUsed).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeletePasskey(passkey.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SecurityTab;
