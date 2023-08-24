import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Children, useMemo, useState} from 'react';
import {HiPlusCircle, HiOutlineTrash} from 'react-icons/hi';
import SortableTask from './SortableTask';

const ColumnLane = ({column, items, id}) => {
    const [editMode, setEditMode] = useState(false);

    const {setNodeRef, setActivatorNodeRef} = useSortable({
        id,
    });

    return (
        <SortableContext items={items}>
            <div
                className='bg-primaryLight w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col shadow-lg'
                ref={setNodeRef}
            >
                {items.map((item, i) => {
                    return <SortableTask task={column.tasks[i]} id={item} />;
                })}
            </div>
        </SortableContext>
    );
};

export default ColumnLane;
