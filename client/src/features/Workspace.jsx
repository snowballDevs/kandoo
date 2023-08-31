import Header from '../components/Header';
import WorkspaceHeader from './WorkspaceHeader';
import KanbanBoard from './kanbanBoard/KanbanBoard';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import WorkspaceSlideOver from './WorkspaceSlideOver';
import { useModalContext } from '../contexts/ModalContext/ModalContext';

const Workspace = () => {
    const {selectedBoard, selectedTask, selectedColumn} = useSelectedBoardContext();
    const {isSlideOverOpen, setIsSlideOverOpen} = useModalContext();

    const {...boardInfo} = selectedBoard;

    // console.log(boardInfo);
    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={boardInfo} />
            <KanbanBoard boardInfo={boardInfo} />
            {isSlideOverOpen&&<WorkspaceSlideOver  boardInfo={boardInfo} taskInfo={selectedTask} columnInfo={selectedColumn}/>}
            {/* <WorkspaceSlideOver  boardInfo={boardInfo} taskInfo={selectedTask}/> */}
        </div>
    );
};

export default Workspace;
