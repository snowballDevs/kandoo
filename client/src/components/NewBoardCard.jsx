// * testing current idea of getting rid of this component to move form closer to the board grid component.
import { useContext } from 'react';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import BoardForm from '../features/BoardForm'

const NewBoardCard = (props) => {
  const {handleModal,isModalOpen, handleOpen, handleClose, setIsModalOpen} = useContext(ModalContext)

  return (
    <div>
      {/* <button type='button' className="rounded-xl p-6 bg-white border-2 border-gray-700 w-full flex justify-center items-center h-[7.313rem]" onClick={handleModal}>open modal</button> */}
      <button type='button' className="btn" onClick={handleModal}>open modal</button>
      {isModalOpen 
        ? <BoardForm  />
        : null}
    </div>
  )
}
export default NewBoardCard;