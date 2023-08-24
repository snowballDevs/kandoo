import {
    useSortable,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import ColumnLane from './ColumnLane';
import {Children} from 'react';
import SortableTask from './SortableTask';
import {useDroppable} from '@dnd-kit/core';

const SortableColumn = ({column, id, items, children}) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        data: {
            type: 'Column',
            children: items,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            className='flex  flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'
            {...listeners}
            {...attributes}
            style={style}
        >
            <ColumnLane column={column} items={items}>
                {children}
            </ColumnLane>
        </div>
    );
};

export default SortableColumn;
