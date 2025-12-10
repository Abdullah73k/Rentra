import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import UserSettings from "../pages/auth/UserSettings";
import Home from "../pages/Home";
import Property from "../pages/properties/Property";
import PropertiesDashboard from "../pages/properties/PropertiesDashboard";
import EmailVerification from "@/pages/auth/EmailVerification";
import TwoFactorAuth from "@/pages/auth/TwoFactorAuth";

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