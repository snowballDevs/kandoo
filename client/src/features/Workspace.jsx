import Header from '../components/Header';
import KanbanBoard from '../components/KanbanBoard';
import {useSelectedBoardContext} from '../contexts/BoardContext/boardContext';
const Workspace = () => {
    const {selectedBoard} = useSelectedBoardContext();

    const {boardName, ...boardInfo} = selectedBoard;

    console.log(boardName);
    return (
        <div>
            <Header boardName={boardName} />
            <KanbanBoard boardInfo={boardInfo} />
        </div>
    );
};

export default Workspace;
