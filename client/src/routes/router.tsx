import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserSettings from "../pages/UserSettings";

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
        {
            path: "settings",
            element: <UserSettings />
        }
    ]
}

export const router = createBrowserRouter([auth])