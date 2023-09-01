// AuthContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import {VerifyJWT} from "../api/jwt.ts";

// Define the shape of your authentication context
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component to wrap your application with
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const login = async () => {
        const isVerify = await VerifyJWT();
        if (isVerify) {
            setIsAuthenticated(true);
        }
    };

    const logout = async () => {
        setIsAuthenticated(false);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Define a custom hook to access the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
