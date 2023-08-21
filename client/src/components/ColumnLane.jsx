import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Children, useMemo, useState} from 'react';
import {HiPlusCircle, HiOutlineTrash} from 'react-icons/hi';
import SortableTask from './SortableTask';

const ColumnLane = ({column, items, id, children}) => {
    const [editMode, setEditMode] = useState(false);
    return (
        <div className='bg-primaryLight w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col shadow-lg '>
            {/* Column title */}
            <div
                onClick={() => {
                    setEditMode(true);
                }}
                className='bg-primaryLight text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-primaryLight border-4 flex items-center justify-between '
            >
                <div className='flex gap-2'>
                    <div className='flex justify-center items-center bg-infoLight py-0 px-6 text-sm rounded-full ring-2 '>
                        {/* {column.tasks.length} */}
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
                {children}
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

export default ColumnLane;
