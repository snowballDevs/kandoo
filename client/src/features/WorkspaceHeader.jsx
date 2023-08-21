import { useState, useContext } from 'react'
import {MdDelete, MdModeEdit, MdFileCopy} from 'react-icons/md';
import {ToastContainer, toast} from 'react-toastify';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import dataService from '../services/dataService';
import formatDate from '../utils/formatDate';
import 'react-toastify/dist/ReactToastify.css';
import BoardConfirmDelete from './BoardConfirmDelete'
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import Modal from '../components/Modal'

const WorkspaceHeader = ({boardInfo}) => {
    const {setCurrentPage} = useRoutingContext();
    const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);

    const [displayedModal, setDisplayedModal] = useState(null)

    const handleDisplayedModal = (modalContent) => {
      setDisplayedModal(modalContent)
      handleOpen();
    }

    const deleteProject = async (id) => {
        try {
            const deletedProject = await dataService.deleteBoard(id);
            console.log(deleteProject);
            setCurrentPage('dashboard');
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    const copyID = async(id) => {
      try {
        console.log('id to be copied: ',id)
        await navigator.clipboard.writeText(id)
        toast.success("Board ID Copied!", {
          position: "top-center",
          autoClose: 750,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress:undefined,
          theme: "colored",
        })
      } catch (error) {
        console.error(error)
      }
    }

    return (
        <div className='bg-whiteLight'>
            <div className=' grid mt-2 w-full px-4 py-4 sm:px-6 max-w-7xl mx-auto items-center grid-cols-1 md:grid-cols-2 bg-whiteLight'>
                <div className='row'>
                    <p className='font-light text-md light:text-secondaryLight dark:text-secondaryLight'>
                        Project:
                    </p>
                    <h1 className='font-bold text-3xl text-secondaryLight'>
                        {boardInfo.boardName}
                    </h1>
                    <h2 className='text-gray-700 mb-4 text-sm dark:text-gray-400'>
                        Created: {formatDate(boardInfo.createdAt)}
                    </h2>
                    <p className='text-secondaryLight line-clamp-2'>
                        {boardInfo.description}
                    </p>
                </div>
                <div className='flex gap-5 mt-5 md:mt-0 justify-end'>

                    <button type='button' className='flex items-center justify-center font-semibold bg-gray-600 text-gray-100 rounded w-min-content py-2 px-2 hover:bg-gray-500' onClick={() => copyID(boardInfo._id)}>
                      <MdFileCopy className='mr-2' /> Copy ID
                    </button>

                    <button type='button' className='flex items-center justify-center font-semibold dark:bg-gray-900 bg-tertiaryLight text-gray-100 dark:bg-gray-600 dark:hover:bg-blue-500 dark:text-gray-100 rounded w-min-content py-2 px-2'>
                        <MdModeEdit className='text-xl mr-2' />
                        Edit

                    </button>

                    <button
                        type='button'

                        onClick={() =>handleDisplayedModal('confirmDelete')}
                        className='flex items-center justify-center font-semibold hover:bg-red-700 text-gray-100 bg-dangerLight dark:hover:bg-red-500 dark:text-gray-100 rounded px-2 w-min-content py-2'
                    ><MdDelete className='text-xl' />
                      
                    </button>
                </div>
            </div>
            <Modal>
              <BoardConfirmDelete closeModal={handleClose} deleteBoard={deleteProject} boardId={boardInfo._id}/>
            </Modal>
        </div>
    );
};

export default WorkspaceHeader;