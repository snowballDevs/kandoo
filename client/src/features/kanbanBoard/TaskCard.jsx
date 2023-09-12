// import clsx from 'clsx';
import {useContext, useState} from 'react';
import {ModalContext} from '../../contexts/ModalContext/ModalContext';
import WorkspaceSlideOver from '../WorkspaceSlideOver';
import {useModalContext} from '../../contexts/ModalContext/ModalContext';

const TaskCard = ({
    task,
    updateTask,
    taskName,
    taskDetail,
    taskComments,
    tags,
    usersId,
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

    // const getPriorityColor = (priority) => {
    //     const priorityColorMap = {
    //         high: 'red-200',    // Change 'high' to the actual priority value
    //         medium: 'yellow-200', // Change 'medium' to the actual priority value
    //     };
    //     return priorityColorMap[priority] || 'blue-200'; // Default to low priority color 
    // };
    

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

    // const taskStyle = {
    //     backgroundColor: 'whiteLight',
    //     borderLeft: `5px solid ${getPriorityColor(priority)}`,
    // };


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
                usersId={usersId}
                assignedUserIds={assignedUserIds}
                columnName={columnName}
                createdAt={createdAt}
                task={task}
                priority={priority}
            />
            

            <div
                className={`px-2 py-4 items-center flex text-left hover:ring-1 hover:ring-pinkLight cursor-grab relative task border-l-4 bg-white
                ${priority === "high" && "border-l-red-200 "} ${priority === "medium" && "border-l-yellow-200"} ${priority === "low" && "border-l-blue-200"}`}
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
                onClick={() => handleSlideOver()}

                style={{
                    position: "relative",
                }}
            >
                {/* Assigned User Icons */}
                <div
                    className="flex absolute top-2 right-2 space-x-2"
                    style={{
                        zIndex: 0, // Ensure the icons are above the task content
                    }}
                >
                    {assignedUserIds.map((person) => (
                        <a
                            key={person.email}
                            href={person.href}
                            className="rounded-full hover:opacity-75"
                        >
                            <img
                                className="inline-block h-8 w-8 rounded-full"
                                src={person.imageUrl}
                                alt={person.name}
                            />
                    </a>
                ))}
            </div>

                <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-black'>
                    {taskName}
                </p>
            </div>
           
        </div>
    );
};

export default TaskCard;
