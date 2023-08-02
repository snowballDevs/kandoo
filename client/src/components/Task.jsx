const Task = ({task}) => {
    const {taskName, priority, taskDetail} = task;

    return (
        <div className='bg-white rounded-lg p-4 shadow'>
            <h3 className='task-title'>{taskName}</h3>
            <p className='task-priority'>Priority: {priority}</p>
            <p className='task-description'>{taskDetail}</p>
        </div>
    );
};

export default Task;
