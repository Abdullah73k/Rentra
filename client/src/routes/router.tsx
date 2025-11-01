import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserSettings from "../pages/UserSettings";
import Home from "../pages/Home";
import PropertiesList from "../pages/PropertiesList";
import PropertyForm from "../pages/PropertyForm";
import Property from "../pages/Property";
import TransactionForm from "../pages/TransactionForm";
import PropertiesDashboard from "../pages/PropertiesDashboard";

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
            path: "properties",
            element: <PropertiesList />
        },
        {    // protected
            path: "properties/:PropertyId",
            element: <Property />
        },
        {
            path: "properties/create",
            element: <PropertyForm />
        },
        {
            path: "properties/dashboard",
            element: <PropertiesDashboard />
        },
        {
            path: "transaction/create",
            element: <TransactionForm />
        },
        
    ]
}

export const router = createBrowserRouter([auth, properties])