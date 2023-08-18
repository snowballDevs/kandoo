import Header from '../components/Header';
// import KanbanBoard from '../components/KanbanBoard';
import WorkspaceHeader from './WorkspaceHeader';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
import KanbanBoard from '../components/dndkanban';
import WorkspaceSlideOver from './WorkspaceSlideOver';

const Workspace = () => {
    const {selectedBoard} = useSelectedBoardContext();

    const {...boardInfo} = selectedBoard;

    console.log(boardInfo);
    return (
        <div>
            <Header />
            <WorkspaceHeader boardInfo={boardInfo} />
            <KanbanBoard boardInfo={boardInfo} />
            <WorkspaceSlideOver boardInfo={boardInfo}/>
        </div>
    );
};

export default Workspace;
