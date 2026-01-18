import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/authProvider";

export const ProtectedRoute = () => {
    const { token, workspaceId } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Se estiver logado mas sem workspace selecionado, 
    // e tentar acessar qualquer pagina que nao seja a de selecao, redireciona.
    if (!workspaceId && location.pathname !== "/workspace-selection") {
        return <Navigate to="/workspace-selection" replace />;
    }

    return <Outlet />;
}