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

    const handleSubmit = async (event) => {
      // prevent refreshing the form
      event.preventDefault()
      // console.log(formData)
      try {
        const jsonPayload = JSON.stringify(formData);
        const response = await fetch('http://localhost:5173/boardFormSubmit', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonPayload,
      });

        // handle response
        if(response.ok) {
          const result = await response.json();
          console.log('API response: ', result)
        } else {
          throw new Error('API request failed: ', response.status)
        }
      } catch (error) {
        console.error('Error: ', error.message)
      }
    
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