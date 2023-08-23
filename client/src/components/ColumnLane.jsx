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
        <div
            className='bg-primaryLight w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col shadow-lg'
            ref={setNodeRef}
        >
            <SortableContext
                id={id}
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => {
                    return <SortableTask task={item} id={item._id} />;
                })}
            </SortableContext>
            {/* Column footer */}
        </div>
    );
};

export default ColumnLane;
