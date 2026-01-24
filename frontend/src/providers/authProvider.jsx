import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [workspaceId, setWorkspaceId_] = useState(localStorage.getItem("workspace_id"));
    const [workspaceName, setWorkspaceName_] = useState(localStorage.getItem("workspace_name"));

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    const setWorkspaceId = (newId) => {
        setWorkspaceId_(newId);
    };

    const setWorkspaceName = (newName) => {
        setWorkspaceName_(newName);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (workspaceId) {
            localStorage.setItem("workspace_id", workspaceId);
        } else {
            localStorage.removeItem("workspace_id");
            localStorage.removeItem("workspace_name"); // Limpa o nome se o ID for removido
            setWorkspaceName_(null);
        }
    }, [workspaceId]);

    useEffect(() => {
        if (workspaceName) {
            localStorage.setItem("workspace_name", workspaceName);
        } else {
            localStorage.removeItem("workspace_name");
        }
    }, [workspaceName]);

    const contextValue = useMemo(() => ({ 
        token, 
        setToken,
        workspaceId,
        setWorkspaceId,
        workspaceName,
        setWorkspaceName
    }), [token, workspaceId, workspaceName]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;