import {useContext} from 'react';
import WorkspaceSlideOver from '../features/WorkspaceSlideOver';
import {ModalContext} from '../contexts/ModalContext/ModalContext';

const Task = ({taskName, key, taskComments, columnName, user, usersAssigned, description}) => {
    const {
        handleModal,
        isModalOpen,
        handleClose,
        handleOpen,
        isSlideOverOpen,
        setIsSlideOverOpen,
        handleSlideOver,
    } = useContext(ModalContext);

    return (
        <div>
                    <WorkspaceSlideOver 
                        taskName = {taskName} 
                        key={key}
                        taskComments={taskComments}
                        columnName={columnName}
                        createdBy={user}
                        usersAssigned={usersAssigned}
                        description={description}/>
        <div
            className=' p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl  cursor-grab relative task'
            onClick={() => handleSlideOver()}
        >
            <h3 className='task-name'>{taskName}</h3>
        </div>
        </div>
    );
};

// const {taskTitle, taskPriority, taskDetail, taskComment, deleteTask, updateTask} = task;

export default Task;
