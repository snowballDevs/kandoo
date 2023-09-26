import {useState, useContext} from 'react'
import { toast } from 'react-toastify';
import dataService from '../../services/dataService';
import {ModalContext} from '../../contexts/ModalContext/ModalContext'
import {useRoutingContext} from '../../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../../contexts/BoardContext/boardContext';

const JoinBoardForm = () => {
  const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);

  const [formData, setFormData] = useState({
    boardId:'',
  })

  const {setCurrentPage} = useRoutingContext();
  const {setSelectedBoard} = useSelectedBoardContext();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
    console.log(event.target.value);
};

const handleSubmit = async (event) => {
  // prevent refreshing the form
  event.preventDefault();
  try {
      
      const response = await dataService.joinBoard(formData);
      console.log(response);
      // handle response
      if (response.status >= 200 && response.status < 300) {
          console.log('Request Successful', response);
          // board object is being passed back to client so that we can navigate to the board on joining board
          const {board} = response.data;
          
          setSelectedBoard(board);
          setCurrentPage('workspace');
          handleClose();
      } 
      
  } catch (error) {
      // handle error
      console.error('Error on joining board: ', error.message);
      if(error.response) {
        console.log(error.response)

        if(error.response.status === 400) {
          toast.error('Already joined this board!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
        } else {
          toast.error('Invalid Board ID', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            } )
        }
      }
  }
};

  return (
    <div>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto w-40'
                        src='/kandoologo.png'
                        alt='Kandoo logo'
                    />
                    <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Join others and collab now
                    </h2>
                </div>

                <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor='boardId'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Project ID
                              <div className='mt-2'>
                                <input
                                    id='boardId'
                                    name='boardId'
                                    type='text'
                                    onChange={handleChange}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                            </label>
                            
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Join Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default JoinBoardForm