import {useContext, useState} from 'react';
import {useModalContext} from '../../contexts/ModalContext/ModalContext';

const TaskCard = ({task, updateTask}) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const {isSlideOverOpen, handleSlideOver} = useModalContext();

    console.log(task);

    const priorityColorMap = {
        high: 'border-red-500',
        medium: 'border-yellow-500',
    };
    const priorityColor = priorityColorMap[task.priority] || 'border-blue-500';



    return (
        <div className=' hover:ring-gray-900 hover:ring-2 rounded'>
            <div
                className={`bg-gray-700  px-2 py-4 items-center flex text-left rounded cursor-grab  border-l-8 ${priorityColor}`}
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
            >
                <p className='my-auto w-full h-[90%] overflow-y-auto overflow-x-hidden   whitespace-pre-wrap text-white'>
                    {task.taskName}
                </p>
            </div>
        </div>
    );
};

export default TaskCard;
