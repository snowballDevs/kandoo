import {createContext, useContext, useState, useMemo, useEffect} from 'react';

// Create a named context
const SelectedBoardContext = createContext();

// Custom hook to allow components to consume the context(authentication)
const useSelectedBoardContext = () => useContext(SelectedBoardContext);

// Creating a provider to wrap components that needs to access Auth/User's data
// a provider is a component that allows you to share context with its nested components
const SelectedBoardProvider = ({children}) => {
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [items, setItems] = useState(selectedBoard?.columns || []);
    const [containers, setContainers] = useState(Object.keys(items));
    const [selectedColumnId, setSelectedColumn] = useState(null);
    const [selectedTaskId, setSelectedTask] = useState(null);

    useEffect(() => {
        // Check if selectedBoard and its columns are available
        if (selectedBoard && selectedBoard.columns) {
            setItems(selectedBoard.columns);
            setContainers(Object.keys(selectedBoard.columns));
        } else {
            // Handle the case when selectedBoard or its columns are null or undefined
            setItems([]);
            setContainers([]);
        }
    }, [selectedBoard]);

    // update the board when
    // useEffect(() => {
    //     console.log('hi');
    //     // Check if selectedBoard and its columns are available
    //     if (selectedBoard && selectedBoard.columns) {
    //         // Update selectedBoard with the modified columns
    //         setSelectedBoard((prevSelectedBoard) => ({
    //             ...prevSelectedBoard,
    //             columns: items,
    //         }));
    //     }
    // }, [items]);

    // So the NO. of containers stay in sync with the NO. items.
    // useEffect(() => {
    //     setContainers(Object.keys(items));
    // }, [items]);

    // useMemo is a Hook that lets you cache the result of a calculation between re-renders.
    const boardValue = useMemo(
        () => ({
            selectedBoard,
            setSelectedBoard,
            selectedTaskId,
            setSelectedTask,
            selectedColumnId,
            setSelectedColumn,
            items,
            setItems,
            containers,
            setContainers,
        }),
        [selectedBoard, selectedTaskId, selectedColumnId, items, containers]
    );

    return (
        <SelectedBoardContext.Provider value={boardValue}>
            {children}
        </SelectedBoardContext.Provider>
    );
};

export {useSelectedBoardContext, SelectedBoardProvider};
