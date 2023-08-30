import Header from '../components/Header';
import WorkspaceHeader from './WorkspaceHeader';
import KanbanBoard from './kanbanBoard/KanbanBoard';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import WorkspaceSlideOver from './WorkspaceSlideOver';

const Workspace = () => {
    const {selectedBoard, selectedTask} = useSelectedBoardContext();

    const {...boardInfo} = selectedBoard;
    const {...taskInfo} = selectedTask

    console.log(taskInfo);
    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={boardInfo} />
            <KanbanBoard boardInfo={boardInfo} />
            <WorkspaceSlideOver  boardInfo={boardInfo} taskInfo={taskInfo}/>
        </div>
    );
};

export default Workspace;
