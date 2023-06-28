import { useState } from 'react'

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('this is a modal dialog')
  
  const handleModal = (content =false) => {
    setIsModalOpen(!isModalOpen)
    if(content) {
      setModalContent(content)
    }
  }
  return {isModalOpen, handleModal, modalContent}
}

export default useModal;