import Header from '../../../components/Header';
import WorkspaceHeader from '../components/WorkspaceHeader';
import KanbanBoard from '../KanbanBoard/KanbanBoard';
import {useSelectedBoardContext} from '../../../contexts/BoardContext/boardContext';
// import WorkspaceSlideOver from '../components/WorkspaceSlideOver';
import {useModalContext} from '../../../contexts/ModalContext/ModalContext';

const Workspace = () => {
    const {selectedBoard, selectedTaskId, selectedColumn} =
        useSelectedBoardContext();
    const {isSlideOverOpen, setIsSlideOverOpen} = useModalContext();

    const {...boardInfo} = selectedBoard;
    console.log(selectedBoard);
    console.log(boardInfo);

    // console.log(boardInfo);
    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={boardInfo} />
            <KanbanBoard boardInfo={boardInfo} />
        </div>
    );
};

export default Workspace;
