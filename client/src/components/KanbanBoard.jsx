import Column from './Column';

const KanbanBoard = ({boardInfo}) => {
    console.log(boardInfo);
    const {columns} = boardInfo;
    console.log(columns);
    const checkingIfThisWorks = (columns) => {
        columns.map((column) => {
            console.log(`these are the column titles: `, column.title);
            console.log(`these are the column tasks`, column.tasks);
        });
    };
    console.log('did this work?', checkingIfThisWorks(columns));
    // console.log('did this work?',getTasks(columns));
    // console.log('did this work?', getTasks(columns));

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