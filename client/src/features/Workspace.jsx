import { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Header from '../components/Header';
import WorkspaceHeader from './WorkspaceHeader';
import KanbanBoard from './kanbanBoard/KanbanBoard';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import WorkspaceSlideOver from './WorkspaceSlideOver';
import { useModalContext } from '../contexts/ModalContext/ModalContext';
import dataService from '../services/dataService';

const Workspace = () => {
    const {selectedBoard, selectedTask, selectedColumn, setSelectedBoard} = useSelectedBoardContext();
    const {isSlideOverOpen} = useModalContext();

    // const {...boardInfo} = selectedBoard;

    const updateBoardInfo = async (id) => {
      try {
        const response = await dataService.getBoard(id)
        setSelectedBoard(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      updateBoardInfo(selectedBoard._id)
      
    }, [isSlideOverOpen])

    // useEffect(() => {
      
    //     console.log(selectedBoard)
    // }, [selectedBoard])

    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={selectedBoard} />
            <KanbanBoard boardInfo={selectedBoard} />        
            {isSlideOverOpen && <WorkspaceSlideOver  boardInfo={selectedBoard} taskInfo={selectedTask} columnInfo={selectedColumn} />}

        </div>
    );
};

export default Workspace;
