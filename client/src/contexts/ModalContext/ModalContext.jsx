//  purpose of this context is to pass modal abilities into other components throughout the app
import {createContext, useMemo, useContext, useState} from 'react';
import useModal from '../../hooks/useModal';

const ModalContext = createContext();

// Custom hook to allow components to consume the context(authentication)
const useModalContext = () => useContext(ModalContext);

const ModalProvider = ({children}) => {
    const {isModalOpen, handleModal, handleClose, handleOpen, setIsModalOpen} =
        useModal();
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

    const handleSlideOver = () => {
        setIsSlideOverOpen((prevState) => !prevState);
    };

    const modalValue = useMemo(
        () => ({
            isModalOpen,
            setIsModalOpen,
            handleModal,
            handleClose,
            handleOpen,
            isSlideOverOpen,
            setIsSlideOverOpen,
            handleSlideOver,
        }),
        [isModalOpen, isSlideOverOpen]
    );


    return (
        <ModalContext.Provider value={modalValue}>
            {children}
        </ModalContext.Provider>
    );
};

export {useModalContext, ModalProvider, ModalContext};
