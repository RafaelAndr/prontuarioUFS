import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./public.routes.jsx";
import { protectedRoutes } from "./protected.routes.jsx";

const Routes = () => {
    const router = createBrowserRouter([
        ...publicRoutes,
        ...protectedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;