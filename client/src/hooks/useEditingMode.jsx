import { useState } from 'react'

const useEditingMode = () => {
  const [isEditing, setIsEditing] = useState(false)


  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }
  
  return {
    isEditing, 
    setIsEditing, 
    toggleEditMode
  }
}

export default useEditingMode