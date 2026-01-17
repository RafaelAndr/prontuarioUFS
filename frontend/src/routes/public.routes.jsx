import { PublicRoute } from "../components/auth/PublicRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const publicRoutes = [
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/cadastro",
                element: <RegisterPage />,
            },
        ],
    },
];