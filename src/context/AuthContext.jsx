import { createContext, useState, useEffect, useContext } from "react";
import { apiLogout, apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const token = (!!localStorage.getItem("accessToken"));
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    },[])

    const login = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        setIsAuthenticated(true);    
    };

    const logout = async () => {
        
        try {
            await apiLogout();
        } catch(err) {
            console.error("Logout API failed", err);
        } finally {
            localStorage.removeItem("accessToken");
        setIsAuthenticated(false);     
        navigate("/profile")
        }
    };

    return <AuthContext.Provider value={ {isAuthenticated, login, logout, isLoading} }>
        { children }
    </AuthContext.Provider>

}
