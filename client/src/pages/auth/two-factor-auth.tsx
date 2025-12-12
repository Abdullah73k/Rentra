import BackupCodeForm from "@/components/form/backup-code-form";
import TotpForm from "@/components/form/totp-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/utils/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session != null) {
      navigate("/");
    }
  }, [session, navigate]);
  if (session != null) {
    return null; // TODO: show loading page or spinner
  }

  return (
    <div className="my-6 px-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="totp">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="totp">Authenticator</TabsTrigger>
              <TabsTrigger value="backup">Backup Code</TabsTrigger>
            </TabsList>

            <TabsContent value="totp">
              <TotpForm />
            </TabsContent>

            <TabsContent value="backup">
              <BackupCodeForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFactorAuth;
