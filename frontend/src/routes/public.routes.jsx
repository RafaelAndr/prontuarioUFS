import { PublicRoute } from "../components/auth/PublicRoute";
import LoginPage from "../pages/LoginPage/LoginPage";

export const publicRoutes = [
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
];