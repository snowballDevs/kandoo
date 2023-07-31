import {useContext, useEffect, useState} from 'react';
import Card from '../components/BoardCard';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import BoardForm from './BoardForm';
import Modal from '../components/Modal';
import Form from '../components/BoardForm';
import dataService from '../services/dataService';

const BoardGrid = ({clickedCardId, setClickedCardId}) => {
    // this should capture an array of objects(boards)
    const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);

    const [boards, setBoards] = useState([]);

    console.log(boards);
    useEffect(() => {
        const getBoards = async () => {
            try {
                const response = await dataService.getBoards();
                console.log(response);
                setBoards(response.data.boards);
            } catch (err) {
                console.log(err);
            }
        };

        getBoards();
    }, []);

    return (
        <div className='px-6 max-w-7xl mx-auto'>
            <div className='grid grid-cols-fluid justify-items-center gap-6 '>
                {boards.map((board) => (
                    <Card
                        key={board.id}
                        name={board.boardName}
                        desc={board.description}
                    />
                ))}
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
