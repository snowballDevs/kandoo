import {createContext, useContext, useState, useMemo, useEffect} from 'react';
import dataService from '../../services/dataService';
import {useRoutingContext} from '../RoutingContext/routingContext';

// Create a named context
const AuthContext = createContext();

// Custom hook to allow components to consume the context(authentication)
const useAuthContext = () => useContext(AuthContext);

// Creating a provider to wrap components that needs to access Auth/User's data
// a provider is a component that allows you to share context with its nested components
const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {setCurrentPage} = useRoutingContext(); // temp

    useEffect(() => {
        async function getUser() {
            try {
                const data = await dataService.getUser();
                if (data.isLoggedIn) {
                    console.log('HI');
                    setIsAuthenticated(true);
                }
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [isAuthenticated]);

    const login = async () => {
        console.log('Clicked');

        try {
            const response = await dataService.login({
                email: 'charcharcodes@gmail.com',
                password: 'goooglygook',
            });

            setCurrentPage('dashboard');
            console.log(response);
            setIsAuthenticated(true);
            console.log(isAuthenticated);
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentPage('landingPage');
    };

    // useMemo is a Hook that lets you cache the result of a calculation between re-renders.
    const authValue = useMemo(
        () => ({isAuthenticated, login, logout}),
        [isAuthenticated]
    );

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export {useAuthContext, AuthProvider};
