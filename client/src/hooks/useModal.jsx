import { useState } from 'react'

export default function useModal () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleModal = () => {
    setIsModalOpen(prevState => !prevState)
    // console.log(isModalOpen)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  return {isModalOpen, handleModal, handleClose, handleOpen, setIsModalOpen}
}
