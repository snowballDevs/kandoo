import {SortableContext, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useMemo, useState} from 'react';
import {HiPlusCircle, HiOutlineTrash} from 'react-icons/hi';
import TaskCard from './dndtaskcard';

const Column = ({
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    taskComment,
    deleteTask,
    updateTask,
}) => {
    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: 'column',
            column,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className='bg-columnBackgroundColor opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className='bg-primaryLight w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col shadow-lg '
        >
            {/* Column title */}
            <div
                {...attributes}
                {...listeners}
                onClick={() => {
                    setEditMode(true);
                }}
                className='bg-primaryLight text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-primaryLight border-4 flex items-center justify-between '
            >
                <div className='flex gap-2'>
                    <div className='flex justify-center items-center bg-infoLight py-0 px-6 text-sm rounded-full ring-2 '>
                        {tasks.length}
                    </div>
                    {!editMode && (
                        <div className='hover:ring-secondaryLight rounded px-1 py-2 hover:ring-2'>
                            {column.title}
                        </div>
                    )}
                    {editMode && (
                        <input
                            className='bg-primaryLight focus:border-redLight border rounded outline-none px-2'
                            value={column.title}
                            onChange={(e) =>
                                updateColumn(column.id, e.target.value)
                            }
                            autoFocus
                            onBlur={() => {
                                setEditMode(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== 'Enter') return;
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => {
                        deleteColumn(column.id);
                    }}
                    className='stroke-gray-500 hover:stroke-white hover:bg-dangerLight
          rounded px-1 py-2'
                >
                    <HiOutlineTrash />
                </button>
            </div>

            {/* Column task container */}
            <div className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            taskComment={taskComment}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </div>
            {/* Column footer */}
            <button
                className='flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:bg-warningLight'
                onClick={() => {
                    createTask(column.id);
                }}
            >
                <HiPlusCircle />
                Add task
            </button>
        </div>
    );
};

export default Column;
