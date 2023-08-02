import Column from './Column';
const KanbanBoard = ({boardInfo}) => {
    const {categoryStages, tasks} = boardInfo;
    console.log(boardInfo);

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex space-x-4 text-black'>
                {categoryStages.map((column, i) => (
                    <Column key={column} columnName={column} tasks={tasks} />
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
