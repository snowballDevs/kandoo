import {
    useSortable,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import ColumnLane from './ColumnLane';
import {Children} from 'react';
import SortableTask from './SortableTask';

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
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
        >
            <div
                ref={setNodeRef}
                className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'
            >
                {items.map((item) => (
                    <SortableTask task={item} id={item._id} />
                ))}
            </div>
        </SortableContext>
    );
};

export default SortableColumn;
