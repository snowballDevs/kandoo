import Header from '../../../components/Header';
import WorkspaceHeader from '../components/WorkspaceHeader';
import KanbanBoard from '../KanbanBoard/KanbanBoard';
import {useSelectedBoardContext} from '../../../contexts/BoardContext/boardContext';

const Workspace = () => {
    const {selectedBoard} = useSelectedBoardContext();

    const {...boardInfo} = selectedBoard;

    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={boardInfo} />
            <KanbanBoard boardInfo={boardInfo} />
        </div>
    );
};

export default Workspace;
