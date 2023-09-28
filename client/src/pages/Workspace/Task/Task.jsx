import {useContext} from 'react';
import {ModalContext} from '../../../contexts/ModalContext/ModalContext';

const Task = ({
    task,
    
}) => {
    const {
        handleSlideOver,
    } = useContext(ModalContext);

    return (
        <div>
            
            <div
                className=' p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl  cursor-grab relative task'
                // onClick={() => handleSlideOver()}
            >
                <h3 className='task-name'>{task.taskName}</h3>
            </div>
        </div>
    );
};

// const {taskTitle, taskPriority, taskDetail, taskComment, deleteTask, updateTask} = task;

export default Task;
