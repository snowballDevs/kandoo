import {createContext, useContext, useState, useMemo} from 'react';

// Create a named context
const RoutingContext = createContext();

// Custom hook to allow components to consume the context(authentication)
const useRoutingContext = () => useContext(RoutingContext);

// Creating a provider to wrap components that needs to access Auth/User's data
// a provider is a component that allows you to share context with its nested components
const RoutingProvider = ({children}) => {
    const [currentPage, setCurrentPage] = useState(null);

    // useMemo is a Hook that lets you cache the result of a calculation between re-renders.
    const routingValue = useMemo(
        () => ({currentPage, setCurrentPage}),
        [currentPage]
    );

    return (
        <RoutingContext.Provider value={routingValue}>
            {children}
        </RoutingContext.Provider>
    );
};

export {useRoutingContext, RoutingProvider};
