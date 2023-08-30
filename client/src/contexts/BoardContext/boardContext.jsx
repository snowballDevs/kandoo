import {createContext, useContext, useState, useMemo} from 'react';

// Create a named context
const SelectedBoardContext = createContext();

// Custom hook to allow components to consume the context(authentication)
const useSelectedBoardContext = () => useContext(SelectedBoardContext);

// Creating a provider to wrap components that needs to access Auth/User's data
// a provider is a component that allows you to share context with its nested components
const SelectedBoardProvider = ({children}) => {
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null)


    // useMemo is a Hook that lets you cache the result of a calculation between re-renders.
    const boardValue = useMemo(
        () => ({selectedBoard, setSelectedBoard,selectedTask, setSelectedTask}),
        [selectedBoard, selectedTask]
    );

    return (
        <SelectedBoardContext.Provider value={boardValue}>
            {children}
        </SelectedBoardContext.Provider>
    );
};

export {useSelectedBoardContext, SelectedBoardProvider};
