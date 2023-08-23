import Header from '../components/Header';
import KanbanBoard from '../components/KanbanBoard';
import WorkspaceHeader from './WorkspaceHeader';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
// import KanbanBoard from '../components/dndkanban';
import WorkspaceSlideOver from './WorkspaceSlideOver';
// import KB from '../components/kb';
// import KB2 from '../components/kb2';
import KANBAN from '../components/KANBAN';

const Workspace = () => {
    const {selectedBoard} = useSelectedBoardContext();

    const {...boardInfo} = selectedBoard;

    console.log(boardInfo);
    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={boardInfo} />
            <KANBAN />
        </div>
    );
};

export default Workspace;
