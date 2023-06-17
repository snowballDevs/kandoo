import {createContext, useContext, useState} from 'react';

// Create a named context
const AuthContext = createContext();

// Custom hook to allow components to consume the context(authentication)
const useAuthContext = () => {
    return useContext(AuthContext);
};

// Creating a provider to wrap components that needs to access Auth/User's data
//a provider is a component that allows you to share context with its nested components
const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        console.log('Logged in');
        setIsAuthenticated(true);
    };

    const logout = () => {
        console.log('Logged out');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export {useAuthContext, AuthProvider};