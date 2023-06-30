//purpose of this context is to pass modal abilities into other components throughout the app
import {createContext} from 'react'
import useModal from '../../hooks/useModal'

const ModalContext = createContext();

const ModalProvider = ({children}) => {
  const {isModalOpen, handleModal, handleClose, handleOpen, setIsModalOpen} = useModal();
  
  return(
    <ModalContext.Provider value = {{isModalOpen,setIsModalOpen, handleModal, handleClose, handleOpen}}>
      {children}
    </ModalContext.Provider>
  ) 
}

export {ModalContext, ModalProvider}