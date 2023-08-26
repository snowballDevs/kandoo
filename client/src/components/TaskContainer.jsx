import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Children, useMemo, useState} from 'react';
import {HiPlusCircle, HiOutlineTrash} from 'react-icons/hi';
import SortableTask from './SortableTask';

const TaskContainer = ({column, items, id, children}) => {
    console.log(column);

    return (
        <div className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
            {children}
        </div>
    );
};

export default TaskContainer;
