import { Outlet } from "react-router-dom";
import HeaderNavigation from "../components/header-navigation";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/auth.provider";

const MainLayout = () => {
  return (
    <AuthProvider>
      <HeaderNavigation />
      <main>
        <Outlet />
        <Toaster />
      </main>
    </AuthProvider>
  );
};

export default MainLayout;