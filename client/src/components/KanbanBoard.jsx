import Column from './Column';

const KanbanBoard = ({boardInfo}) => {
    console.log(boardInfo);
    const {columns} = boardInfo;

    return (
        <div>

        <div
            className='
                    m-auto 
                    flex 
                    min-h-screen 
                    w-full 
                    items-center 
                    overflow-x-auto 
                    overflow-y-hidden 
                    px-[40px]
                    bg-tertiaryLight'
        >
            {columns.map((column) => (
                <Column
                    key={column._id}
                    columnName={column.title}
                    columnTasks={column.tasks}
                />
            ))}
        </div>
        </div>
    );
};

export default KanbanBoard;
