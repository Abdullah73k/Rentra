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
import type { User } from "@/lib/types";

const SecurityTab = ({
  user,
  handleGeneratePasskey,
  handleToggle2FA,
  handleDeletePasskey
}: {
  user: User;
  handleGeneratePasskey: () => void;
  handleToggle2FA: () => void;
  handleDeletePasskey: (passkeyId: string) => void;
}) => {
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
            <CardDescription>
              Request a password reset link via email
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
            </div>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Status:{" "}
                  {user.twoFactorEnabled ? (
                    <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                      Enabled
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-2">
                      Disabled
                    </Badge>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.twoFactorEnabled
                    ? "Your account is protected with two-factor authentication"
                    : "Enable 2FA to secure your account with an additional verification step"}
                </p>
              </div>
              <Button
                onClick={handleToggle2FA}
                variant={user.twoFactorEnabled ? "destructive" : "default"}
                className="rounded-full"
              >
                {user.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
              </Button>
            </div>
          </CardContent>
        </Card>

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
