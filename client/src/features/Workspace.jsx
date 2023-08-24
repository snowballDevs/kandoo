import Header from '../components/Header';
// import KanbanBoard from '../components/KanbanBoard';
import WorkspaceHeader from './WorkspaceHeader';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';

import WorkspaceSlideOver from './WorkspaceSlideOver';
import KANBAN from '../components/KANBAN';

const Workspace = () => {
    const {selectedBoard} = useSelectedBoardContext();

    const {...boardInfo} = selectedBoard;

    console.log(boardInfo);
    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={boardInfo} />
            <KANBAN boardInfo={boardInfo} />
        </div>
    );
};

export default Workspace;
