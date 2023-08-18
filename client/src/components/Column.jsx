import Task from './Task';

const Column = ({columnName, columnTasks}) => {
    return (
        <div className='bg-gray-200 rounded p-4 shadow'>
            <h2 className='text-xl font-bold text-black'>{columnName}</h2>
            {columnTasks.map((task) => (
                <Task
                    key={task._id}
                    taskName={task.taskName}
                    taskComments={task.comments}
                />
            ))}
        </div>
    );
};

export default Column;
