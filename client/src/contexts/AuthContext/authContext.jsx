import {createContext, useContext, useState, useMemo, useEffect} from 'react';
import dataService from '../../services/dataService';
import {useRoutingContext} from '../RoutingContext/routingContext';
import {useModalContext} from '../ModalContext/ModalContext';

// Create a named context
const AuthContext = createContext();

// Custom hook to allow components to consume the context(authentication)
const useAuthContext = () => useContext(AuthContext);

// Creating a provider to wrap components that needs to access Auth/User's data
// a provider is a component that allows you to share context with its nested components
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const {setCurrentPage} = useRoutingContext();
    const {handleClose} = useModalContext();

    // To check if there is already a user session
    useEffect(() => {
        async function authCheck() {
            try {
                const response = await dataService.getUser();
                console.log(response);
                const user = response.data.user;
                console.log('Get User', user);

                // is user session, save user's info to the context
                if (user instanceof Object) {
                    console.log(user);
                    setUser(user);
                    setCurrentPage('dashboard');
                } else {
                    setUser(null);
                    setCurrentPage('landingPage');
                }
            } catch (err) {
                console.log(err);
            }
        }
        authCheck();
    }, []);

    const login = async (data) => {
        console.log('Clicked');

        try {
            const response = await dataService.login(data);
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                const user = response.data.user;
                setUser(user);
                handleClose();
                setCurrentPage('dashboard');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        console.log('Clicked');

        try {
            const response = await dataService.logout();
            setUser(null);
            setCurrentPage('landingPage');
        } catch (err) {
            console.log(err);
        }
    };

    const signUp = async (data) => {
        try {
            const response = await dataService.signup(data);
            if (response.status >= 200 && response.status < 300) {
                const user = response.data.user;
                setUser(user);
                handleClose();
                setCurrentPage('dashboard');
            }
        } catch (error) {
            console.error('Error message: ', error.message);
        }
    };

    // useMemo is a Hook that lets you cache the result of a calculation between re-renders.
    const authValue = useMemo(
        () => ({user, setUser, login, logout, signUp}),
        [user]
    );

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export {useAuthContext, AuthProvider};
