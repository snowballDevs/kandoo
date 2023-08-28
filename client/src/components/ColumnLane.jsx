import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Children, useMemo, useState} from 'react';
import {HiPlusCircle, HiOutlineTrash} from 'react-icons/hi';
import ColumnHeader from './ColumnHeader';
import SortableTask from './SortableTask';
import AddTask from './AddTask';

const ColumnLane = ({
    column,
    items,
    children,
    addTask,
    containerId,
    handleRemove,
}) => {
    console.log(column);
    console.log(containerId);
    return (
        <div className='bg-primaryLight w-[350px] h-full max-h-full rounded-md flex flex-col flex-grow  shadow-lg overflow-y-auto'>
            <ColumnHeader
                column={column}
                items={items}
                handleRemove={handleRemove}
                containerId={containerId}
            />

            {/* Container for all sortable tasks*/}
            <ul className='flex flex-col flex-grow gap-2 p-2 overflow-x-hidden min-h-[500px] overflow-y-auto '>
                {children}
            </ul>

            <AddTask addTask={addTask} containerId={containerId} />
        </div>
    );
};

export default ColumnLane;
