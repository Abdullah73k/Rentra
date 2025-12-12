import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { UserSettingsTab } from "@/lib/types";
import LeftSidebar from "@/components/user-settings/left-sidebar";
import ProfileTab from "@/components/user-settings/profile-tab";
import SecurityTab from "@/components/user-settings/security-tab";
import PreferencesTab from "@/components/user-settings/preferences-tab";
import { authClient } from "@/utils/auth-client";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<UserSettingsTab>("profile");

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) navigate("/auth/login");
  }, [isPending, session, navigate]);

  if (isPending) {
    return null; // TODO: add loading screen here
  }

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
            {activeTab === "security" && <SecurityTab session={session} />}

            {/* Preferences Tab */}
            {activeTab === "preferences" && <PreferencesTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
