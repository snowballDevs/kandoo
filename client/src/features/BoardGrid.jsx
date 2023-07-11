import {useContext} from 'react'
import Card from '../components/BoardCard';
import { ModalContext } from '../contexts/ModalContext/ModalContext';
import BoardForm from "./BoardForm";
    
    const BoardGrid = () => {
      // this should capture an array of objects(boards)
      const {handleModal, isModalOpen, handleClose} = useContext(ModalContext);

    return (
    <div className='px-6 max-w-7xl mx-auto'>
        <div className='grid grid-cols-fluid justify-items-center gap-6 '>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <div>
              <button type='button' className="btn" onClick={handleModal}>open modal</button>
              {isModalOpen 
                ? <BoardForm handleClose={handleClose} className="modal-box"/>
                : null}
            </div>
        </div>
    </div>
    )
};

export default BoardGrid;
