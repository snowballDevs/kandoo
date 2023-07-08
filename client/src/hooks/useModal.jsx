import { useState } from 'react'

export default function useModal () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleModal = () => {
    setIsModalOpen(prevState => !prevState)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  return {isModalOpen, handleModal, handleClose, handleOpen, setIsModalOpen}
}
