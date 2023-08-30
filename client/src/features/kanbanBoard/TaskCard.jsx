// import clsx from 'clsx';
import {useContext, useState} from 'react';
import {ModalContext} from '../../contexts/ModalContext/ModalContext';
import WorkspaceSlideOver from '../WorkspaceSlideOver';

const TaskCard = ({
    task,
    updateTask,
    taskName,
    taskDetail,
    taskComments,
    tags,
    assignedUserIds,
    columnName,
    createdAt,
    boardId,
    columnId,
    priority,
}) => {
    const {handleSlideOver} = useContext(ModalContext);
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const getPriorityColor = (priority) => {
        const priorityColorMap = {
            high: 'red-200',    // Change 'high' to the actual priority value
            medium: 'yellow-200', // Change 'medium' to the actual priority value
        };
        return priorityColorMap[priority] || 'blue-200'; // Default to low priority color 
    };
    

    if (editMode) {
        return (
            <div className='bg-mainBackgroundColor px-2 py-4 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-pinkLight cursor-grab relative'>
                <textarea
                    className='
            h-[90%]
            w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
          '
                    placeholder='Task content here'
                    onBlur={toggleEditMode}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                            toggleEditMode();
                        }
                    }}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                />
            </div>
        );
    }

    const taskStyle = {
        backgroundColor: 'whiteLight',
        borderLeft: `5px solid ${getPriorityColor(priority)}`,
    };


    return (
        <div>

            <WorkspaceSlideOver
                key={task._id}
                taskId={task._id}
                columnId={columnId}
                boardId={boardId}
                taskName={taskName}
                taskDetail={taskDetail}
                taskComments={taskComments}
                tags={tags}
                assignedUserIds={assignedUserIds}
                columnName={columnName}
                createdAt={createdAt}
                task={task}
                priority={priority}
            />
            
            {/* task -- if you try to change the template literals, they will stop working until you re-type them. Idk why. --Michelle */}
            <div
                className={`px-2 py-4 items-center flex text-left hover:ring-1 hover:ring hover:ring-pinkLight cursor-grab relative task border-l-4 border-${getPriorityColor(priority)}`}
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
                onClick={() => handleSlideOver()}

                style={{
                    backgroundColor: 'white',
                    borderLeft: `5px solid ${getPriorityColor(priority)}`,
                }}
            >
                <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-black'>
                    {taskName}
                </p>
            </div>
           
        </div>
    );
};

export default TaskCard;
