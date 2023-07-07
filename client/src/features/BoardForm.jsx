// todos: keep state/submission within the board form - board form submission will later on be submitted to the database
// todos: setup postman POST route for this form 

import { useState } from "react"

const BoardForm = () =>{
    const [formData, setFormData] = useState({
      boardName:"",
      boardDescription: "",
      boardCategory:"",
    })

    const handleChange = (event) => {
      const {name, value} = event.target
      setFormData(prevFormData => ({
          ...prevFormData,
          [name] : value,
        }))
        console.log(event.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      // const {name, value} = event.target.value
      

    }
    
    return (
      <div >
        <div className='fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
        <form className="modal-box" onSubmit={handleSubmit}>
          <label htmlFor='boardName'>
            Name your board: 
              <input 
                id='boardName' 
                type="text" 
                name="boardName" 
                value={formData.boardName} 
                onChange={handleChange}
              />
          </label>
          <label htmlFor="boardDescription">
            <textarea 
              id="boardDescription" 
              name="boardDescription"
              value={formData.boardDescription}
              onChange={handleChange}
              placeholder="short board description!"
            />
          </label>
          <label htmlFor="boardCategory">
            Category: 
            <select 
              name="boardCategory" 
              id="boardCategory" 
              value= {formData.boardCategory}
              onChange={handleChange}
            >
              <option value="">-- Choose --</option>
              <option value="home">Home</option>
              <option value="business">Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </label>
          <button type='submit'>Submit</button>
        </form>
        </div>
      </div>
    )
}


export default BoardForm