import BackupCodeForm from "@/components/form/backup-code-form";
import TotpForm from "@/components/form/totp-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const session = useAuthStore((s) => s.session);

  useEffect(() => {
    if (session != null) {
      navigate("/");
    }
  }, [session, navigate]);
  if (session != null) {
    return null; // TODO: show loading page or spinner
  }

  return (
    <div className="bg-[#f8f8f8] my-6 px-4">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Two-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="totp">
          <div className="w-full flex justify-center">
            <TabsList className="w-2/7 mb-8">
              <TabsTrigger value="totp">Authenticator</TabsTrigger>
              <TabsTrigger value="backup">Backup Code</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="totp">
            <TotpForm />
          </TabsContent>

          <TabsContent value="backup">
            <BackupCodeForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
};

export default TwoFactorAuth;
