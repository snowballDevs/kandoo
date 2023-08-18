import { useState } from 'react'

const useEditingMode = (initialContent) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(initialContent)

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  const handleContentChange = (event) => {
    setEditedContent(event.target.textContent)
  }
  
  return {
    isEditing, 
    setIsEditing, 
    editedContent, 
    setEditedContent,
    handleContentChange
  }
}

export default useEditingMode