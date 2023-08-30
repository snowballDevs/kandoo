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
    console.log(useModalContext);
    const {setCurrentPage} = useRoutingContext(); // temp
    const {handleClose} = useModalContext();

    useEffect(() => {
        async function authenticated() {
            try {
                const data = await dataService.getUser();
                console.log(data);
                const user = data.data;
                console.log('Get User', user);
                if (user instanceof Object) {
                    console.log(user);
                    setUser(user);
                    setCurrentPage('dashboard');
                    // setting state for logged in user's first and last name
                    // console.log(`${data.data.user.firstName} ${data.data.user.lastName}`)
                } else {
                    setCurrentPage('landingPage');
                }
            } catch (err) {
                console.log(err);
            }
        }
        authenticated();
    }, []);

    const login = async (data) => {
        console.log('Clicked');

        try {
            const response = await dataService.login(data);

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
            console.log(response);
            setUser(null);
            setCurrentPage('landingPage');
        } catch (err) {
            console.log(err);
        }
    };

    // useMemo is a Hook that lets you cache the result of a calculation between re-renders.
    const authValue = useMemo(() => ({user, setUser, login, logout}), [user]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export {useAuthContext, AuthProvider};
