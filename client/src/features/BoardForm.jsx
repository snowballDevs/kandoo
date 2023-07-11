import { useState } from "react"

const BoardForm = ({handleClose}) =>{
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
      try {
        const jsonPayload = JSON.stringify(formData);
        const response = await fetch('http://localhost:8888/boardFormSubmit', { // to be changed later on with axios
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
      handleClose()
    }
    
    return (
        <div className='fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[75%] ' >
        <form className="modal-box mx-auto form-control w-full" onSubmit={handleSubmit}>
          <label htmlFor='boardName' className="label label-text block mb-2 font-bold text-lg">
            {/* <span className="label-text">Name your board: </span> */}
            Name your Board:
              <input 
                id='boardName' 
                type="text" 
                name="boardName" 
                value={formData.boardName} 
                onChange={handleChange}
                className="input w-full max-w-xs block mt-2 border-indigo-600"
              />
          </label>
          <label htmlFor="boardDescription" className="label label-text block mb-2 font-bold text-lg">
            What is your board all about?
            <textarea 
              id="boardDescription" 
              name="boardDescription"
              value={formData.boardDescription}
              onChange={handleChange}
              placeholder="type here!"
              className="block w-full text-sm border-2 rounded-lg border-indigo-800 pl-2 font-normal"
            />
          </label>
          <label htmlFor="boardCategory" className="label label-text block mb-2 font-bold text-lg">
            Category: 
            <select 
              name="boardCategory" 
              id="boardCategory" 
              value= {formData.boardCategory}
              onChange={handleChange}
              className="block select border-indigo-600 mt-2"
            >
              <option value="">-- Choose --</option>
              <option value="home">Home</option>
              <option value="business">Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </label>
          <button type='submit' className="btn btn-outline border-2 border-indigo-800">Submit</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button type="button" className="">Close</button>
        </form>
        </div>
    )
}


export default BoardForm