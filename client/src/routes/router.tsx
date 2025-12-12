import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../layouts/main-layout";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import UserSettings from "../pages/auth/user-settings";
import Home from "../pages/home";
import Property from "../pages/properties/property";
import PropertiesDashboard from "../pages/properties/properties-dashboard";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import EmailVerification from "@/pages/auth/email-verification";
import TwoFactorAuth from "@/pages/auth/two-factor-auth";

const auth = {
    path: "/auth",
    element: <Root />,
    children: [
        {index: true, element: <Navigate to="/" replace />},
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "signup",
            element: <Signup />
        },
        {    // protected
            path: "settings",
            element: <UserSettings /> 
        },
        {
            path: "forgot-password",
            element: <ForgotPassword />
        },
        {
            path: "reset-password",
            element: <ResetPassword />
        },
        {
            path: "verify-email/:email",
            element: <EmailVerification />
        },
        {
            path: "2fa",
            element: <TwoFactorAuth />
        }
    ]
}
const properties = {
    path: "/",
    element: <Root />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {    // protected
            path: "properties/:PropertyId",
            element: <Property />
        },
        {   // protected
            path: "properties/dashboard",
            element: <PropertiesDashboard />
        },
        
    ]
}

export const router = createBrowserRouter([auth, properties])