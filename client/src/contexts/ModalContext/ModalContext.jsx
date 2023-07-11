//  purpose of this context is to pass modal abilities into other components throughout the app
import {createContext, useMemo} from 'react'
import useModal from '../../hooks/useModal'

const ModalContext = createContext();

const ModalProvider = ({children}) => {
  const {isModalOpen, handleModal, handleClose, handleOpen, setIsModalOpen} = useModal();

  const modalValue = useMemo(
    () => ({isModalOpen, setIsModalOpen, handleModal, handleClose, handleOpen}),
    [isModalOpen] 
  )
  
  return(
    <ModalContext.Provider value = {modalValue}>
      {children}
    </ModalContext.Provider>
  ) 
}

export {ModalContext, ModalProvider}