import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { mockUser } from "@/lib/mock-user";
import type { Passkey, UserSettingsTab } from "@/lib/types";
import LeftSidebar from "@/components/userSettings/LeftSidebar";
import ProfileTab from "@/components/userSettings/ProfileTab";
import SecurityTab from "@/components/userSettings/SecurityTab";
import PreferencesTab from "@/components/userSettings/PreferencesTab";
import { authClient } from "@/utils/auth-client";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<UserSettingsTab>("profile");
  const [user, setUser] = useState(mockUser);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) navigate("/auth/login");
  }, [isPending, session, navigate]);

  if (isPending) {
    return null; // could render a spinner here
  }

  console.log(session?.user);

  const handleToggle2FA = () => {
    setUser({ ...user, twoFactorEnabled: !user.twoFactorEnabled });
  };

  const handleGeneratePasskey = () => {
    const newPasskey: Passkey = {
      id: `passkey-${Date.now()}`,
      name: `Passkey ${user.passkeys.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    setUser({ ...user, passkeys: [...user.passkeys, newPasskey] });
  };

  const handleDeletePasskey = (passkeyId: string) => {
    setUser({
      ...user,
      passkeys: user.passkeys.filter((p) => p.id !== passkeyId),
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto">
        {/* Header */}
        <div className="border-b border-border px-6 py-6 bg-white">
          <Link to="/properties/dashboard">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-foreground">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account information and security settings
          </p>
        </div>

        <div className="flex">
          {/* Left Sidebar Tabs */}
          <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content Area */}
          <div className="flex-1 p-6 max-w-4xl">
            {/* Profile Tab */}
            {activeTab === "profile" && <ProfileTab user={session} />}

            {/* Security Tab */}
            {activeTab === "security" && (
              <SecurityTab
                user={user}
                handleDeletePasskey={handleDeletePasskey}
                handleGeneratePasskey={handleGeneratePasskey}
                handleToggle2FA={handleToggle2FA}
              />
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && <PreferencesTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
