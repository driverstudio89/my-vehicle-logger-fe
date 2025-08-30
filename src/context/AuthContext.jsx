import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("accessToken"));
    },[])

    const login = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        setIsAuthenticated(true);    
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);        
    };

    return <AuthContext.Provider value={ {isAuthenticated, login, logout} }>
        { children }
    </AuthContext.Provider>

}
