import {useContext, useEffect, useState} from 'react';
import Card from './BoardCard';
import {ModalContext} from '../../contexts/ModalContext/ModalContext';
import Modal from '../../components/Modal';
import CreateBoardForm from './CreateBoardForm';
import {useRoutingContext} from '../../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../../contexts/BoardContext/boardContext';
import dataService from '../../services/dataService';
import JoinBoardForm from './JoinBoardForm';

const BoardGrid = () => {
    // this should capture an array of objects(boards)
    const {handleOpen} = useContext(ModalContext);

    const {setSelectedBoard} = useSelectedBoardContext();

    const {setCurrentPage} = useRoutingContext();

    const [boards, setBoards] = useState([]);
    const [displayedForm, setDisplayedForm] = useState(null);

    const handleDisplayedForm = (formToDisplay) => {
        setDisplayedForm(formToDisplay);
        handleOpen();
    };

    const getBoards = async () => {
        try {
            const response = await dataService.getBoards();
            setBoards(response.data.boards);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBoards();
    }, []);

    // Deleting a board happens within a the workspace now.
    // const onDelete = async (e, id) => {
    //     e.stopPropagation();
    //     const deletedBoard = await dataService.deleteBoard(id);
    //     await getBoards();
    // };

    const navigateToBoard = (e) => {
        const {id} = e.currentTarget;
        const selectedBoard = boards.find((board) => board._id === id);
        setSelectedBoard(selectedBoard);
        setCurrentPage('workspace');
    };

    return (
        <div className='px-6 max-w-7xl mx-auto'>
            <div className='flex justify-center pb-8'>
                <button
                    type='button'
                    className='btn bg-tertiaryLight text-primaryLight border-tertiaryLight hover:bg-successLight hover:text-secondaryLight'
                    onClick={() => handleDisplayedForm('create')}
                >
                    Create New Project
                </button>
                <button
                    className='btn bg-secondaryLight text-primaryLight hover:bg-fuchsia-500 ml-3'
                    type='button'
                    onClick={() => handleDisplayedForm('join')}
                >
                    Join Project
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
                        // onDelete={onDelete}
                    />
                ))}

                <Modal>
                    {displayedForm === 'create' && <CreateBoardForm />}
                    {displayedForm === 'join' && <JoinBoardForm />}
                </Modal>
            </div>
        </div>
    );
};

export default BoardGrid;
