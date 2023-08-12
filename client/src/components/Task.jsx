const Task = ({
    task,
    taskName,
    taskPriority,
    taskDetail,
    taskComment,
    deleteTask,
    updateTask,
}) => {
    
    // const {taskTitle, taskPriority, taskDetail, taskComment, deleteTask, updateTask} = task;

    return (
        <div className='bg-white rounded-lg p-4 shadow'>
            <h3 className='task-name'>{taskName}</h3>
            <p className='task-priority'>Priority: {taskPriority}</p>
            <p className='task-description'>Detail: {taskDetail}</p>
            <p className='task-priority'>Comments: {taskComment}</p>
            <p className='task-description'>{taskDetail}</p>
        </div>
    );
};

export default Task;
