import {useContext, useEffect, useState} from 'react';
import Card from '../components/BoardCard';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import BoardForm from './BoardForm';
import Modal from '../components/Modal';
import CreateBoardForm from '../components/CreateBoardForm';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import dataService from '../services/dataService';

const BoardGrid = ({clickedCardId, setClickedCardId}) => {
    // this should capture an array of objects(boards)
    const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);

    const {setSelectedBoard} = useSelectedBoardContext();

    const {setCurrentPage} = useRoutingContext();

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getBoards();
    }, []);

    const getBoards = async () => {
        try {
            console.log('Sending Request');
            const response = await dataService.getBoards();
            console.log(response);
            setBoards(response.data.boards);
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete = async (e, id) => {
        e.stopPropagation();
        const deletedBoard = await dataService.deleteBoard(id);
        console.log(deletedBoard);
        await getBoards();
    };

    const navigateToBoard = (e) => {
        const {id} = e.currentTarget;
        const board = boards.find((board) => board._id === id);
        console.log(board);
        setSelectedBoard(board);
        setCurrentPage('workspace');
    };

    return (
        <div className='px-6 max-w-7xl mx-auto'>
            <div className='flex justify-center pb-8'>
                <button
                    type='button'
                    className='btn bg-flashy text-primaryLight border-primaryLight'
                    onClick={handleModal}
                >
                    Create New Board
                </button>
            </div>
            <div className='grid grid-cols-fluid justify-items-center gap-6 '>
                {boards.map((board) => (
                    <Card
                        onClick={navigateToBoard}
                        key={board._id}
                        name={board.boardName}
                        desc={board.description}
                        id={board._id}
                        onDelete={onDelete}
                    />
                ))}

                <Modal>
                    <CreateBoardForm />
                </Modal>
            </div>
        </div>
    );
};

export default BoardGrid;
