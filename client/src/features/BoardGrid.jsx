import {useContext, useEffect, useState} from 'react';
import Card from '../components/BoardCard';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import Modal from '../components/Modal';
import CreateBoardForm from '../components/CreateBoardForm';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import dataService from '../services/dataService';
import JoinBoardForm from './JoinBoardForm';


const BoardGrid = ({clickedCardId, setClickedCardId}) => {
    // this should capture an array of objects(boards)
    const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);

    const {setSelectedBoard} = useSelectedBoardContext();

    const {setCurrentPage} = useRoutingContext();

    const [boards, setBoards] = useState([]);
    const [displayedForm, setDisplayedForm] = useState(null)

    const handleDisplayedForm = (formToDisplay) => {
      setDisplayedForm(formToDisplay)
      handleOpen();
    }

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
