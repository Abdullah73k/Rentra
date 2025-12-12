import type { UserSettingsTab } from "@/lib/types";
import { Settings, Shield, UserIcon } from "lucide-react";
import type React from "react";

const LeftSidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: UserSettingsTab;
  setActiveTab: React.Dispatch<React.SetStateAction<UserSettingsTab>>;
}) => {
  return (
    <div className="w-64 bg-white border-r border-border min-h-screen p-6">
      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
            activeTab === "profile"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-muted-foreground"
          }`}
        >
          <UserIcon className="h-5 w-5" />
          <span className="font-medium">Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
            activeTab === "security"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-muted-foreground"
          }`}
        >
          <Shield className="h-5 w-5" />
          <span className="font-medium">Security</span>
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
            activeTab === "preferences"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-muted-foreground"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Preferences</span>
        </button>
      </nav>
    </div>
  );
};

export default LeftSidebar;
