import {useContext, useEffect, useState} from 'react';
// import { Id, Task } from "../types";
import {HiOutlineTrash} from 'react-icons/hi';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import TaskModal from './TaskModal';
import Task from './Task';

const TaskCard = ({
    task,
    taskName,
    taskPriority,
    taskComment,
    taskDetail,
    deleteTask,
    updateTask,
}) => {
    const {
        handleModal,
        isModalOpen,
        handleClose,
        handleOpen,
        isSlideOverOpen,
        setIsSlideOverOpen,
        handleSlideOver,
    } = useContext(ModalContext);

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // const toggleEditMode = () => {
    //     setEditMode((prev) => !prev);
    //     setMouseIsOver(false);
    // };

    if (editMode) {
        return (
            <div className='bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-pinkLight cursor-grab relative'>
                <textarea
                    className='
            h-[90%]
            w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
          '
                    autoFocus
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

    return (
        <div
            // onClick={() => handleSlideOver()}
            className='bg-secondaryLight p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-pinkLight cursor-grab relative task'
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-white'>
                {task.taskName}
            </p>

            <h1>hi</h1>

            {mouseIsOver && (
                <button className='stroke-white hover:stroke-slate-100 absolute right-4 top-1/2 -translate-y-1/2 bg-dangerLight p-2 rounded opacity-100 hover:opacity-100'>
                    <HiOutlineTrash />
                </button>
            )}
        </div>
    );
};

export default TaskCard;