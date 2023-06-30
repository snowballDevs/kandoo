import {useState} from 'react'

const BoardForm = () => {
  const [formData, setFormData] = useState({
    boardName: '',
    category:'',
  })
  const handleSubmit = (e) => {
    const {name, value} = e.target
    e.preventDefault()
    setFormData(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  } 
  return (

    <div className='bg-violet-700 opacity-95 fixed w-screen h-screen' >
      <div className='fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <form className="modal-box" onSubmit={handleSubmit}>
        <label>
          Name your board: <input type="text" defaultValue="Generic Board Name" name="boardName" value={formData.boardName}></input>
        </label>
        <label>
          Category: 
        </label>
        <select name="category" id="category">
          <option value="home">Home</option>
          <option value="business">Business</option>
          <option value="enterprise">Enterprise</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
    </div>
      </div>
      
  )
}

export default BoardForm