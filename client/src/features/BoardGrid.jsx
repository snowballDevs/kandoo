import {useContext} from 'react';
import Card from '../components/BoardCard';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import BoardForm from './BoardForm';
import Modal from '../components/Modal';
import Form from '../components/BoardForm';

const BoardGrid = ({clickedCardId, setClickedCardId}) => {
    // this should capture an array of objects(boards)
    const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);
    return (
        <div className='px-6 max-w-7xl mx-auto'>
            <div className='grid grid-cols-fluid justify-items-center gap-6 '>
                <Card
                    clickedCardId={clickedCardId}
                    setClickedCardId={setClickedCardId}
                />
                <Card
                    clickedCardId={clickedCardId}
                    setClickedCardId={setClickedCardId}
                />
                <Card
                    clickedCardId={clickedCardId}
                    setClickedCardId={setClickedCardId}
                />
                <Card
                    clickedCardId={clickedCardId}
                    setClickedCardId={setClickedCardId}
                />
                <Card
                    clickedCardId={clickedCardId}
                    setClickedCardId={setClickedCardId}
                />
                <div>
                    <button type='button' className='btn' onClick={handleModal}>
                        Create New Board
                    </button>
                </div>

                <Modal>
                    <Form />
                </Modal>
            </div>
        </div>
    );
};

export default BoardGrid;
