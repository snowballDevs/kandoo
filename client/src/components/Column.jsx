import Task from './Task';

const Column = ({columnName, tasks}) => (
    <div className='bg-gray-200 rounded p-4 shadow'>
        <h2 className='text-xl font-bold text-black'>{columnName}</h2>
        <div className='mt-4 space-y-4'>
            {tasks.map((task) => (
                <Task key={task._id} task={task} />
            ))}
        </div>
    </div>
);

export default Column;
