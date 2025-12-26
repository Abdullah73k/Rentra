import { Outlet } from "react-router-dom";
import HeaderNavigation from "../components/header-navigation";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/auth.provider";
import UserIcon from "@/components/user-icon";

const MainLayout = () => {
  return (
    <AuthProvider>
      <HeaderNavigation />
      <UserIcon />
      <main>
        <Outlet />
        <Toaster />
      </main>
    </AuthProvider>
  );
};

export default MainLayout;
