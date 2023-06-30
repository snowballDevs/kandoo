import { useContext } from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import BoardForm from '../features/BoardForm'

const NewCard = () => {
  const {handleModal,isModalOpen, handleOpen, handleClose, setIsModalOpen} = useContext(ModalContext)

  return (
    <>
      <button className="rounded-xl p-6 bg-white border-2 border-gray-700 w-full flex justify-center items-center h-[7.313rem]" onClick={handleModal}>open modal</button>
      {isModalOpen 
        ? <BoardForm  />
        : <div>this is not working</div>}
    </>
  )
}
export default NewCard;