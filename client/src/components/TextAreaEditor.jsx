import { useState } from 'react'
import useEditingMode from "../hooks/useEditingMode";
import dataService from '../services/dataService';

const TextAreaEditor = ({boardInfo, setFormData, formData, isEditing, toggleEditMode}) => {

    const handleSubmit = async (event) => {
      event.preventDefault()
      try {
        const response = await dataService.updateBoard(boardInfo._id,formData)
        console.log(response)
        toggleEditMode()

      } catch (error) {
        console.error(error)
      }
    }
    const handleChange = (event) => {
      const {name, value} = event.target
      setFormData(prevFormData => ({
          ...prevFormData, 
          [name]: value
        }))
      
    }

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form className="relative" onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <textarea
              type="text"
              rows={3}
              name="description"
              id="description"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={formData.description}
              onChange={handleChange}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">

            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TextAreaEditor