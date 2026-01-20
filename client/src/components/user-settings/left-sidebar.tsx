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
    <div className="w-full md:w-64 bg-[#f8f8f8] border-b md:border-b-0 md:border-r border-border p-4 md:p-6 md:min-h-screen sticky top-0 md:relative z-20">
      <nav className="flex md:flex-col overflow-x-auto md:overflow-visible space-x-2 md:space-x-0 md:space-y-2 no-scrollbar pb-1 md:pb-0">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap ${activeTab === "profile"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-muted-foreground"
            }`}
        >
          <UserIcon className="h-5 w-5" />
          <span className="font-medium">Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap ${activeTab === "security"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary text-muted-foreground"
            }`}
        >
          <Shield className="h-5 w-5" />
          <span className="font-medium">Security</span>
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap ${activeTab === "preferences"
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
