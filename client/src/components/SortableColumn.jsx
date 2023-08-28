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

const SortableColumn = ({
    column,
    id,
    items,
    addTask,
    containerId,
    children,
}) => {
    console.log(containerId);
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
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ColumnLane
                column={column}
                items={items}
                addTask={addTask}
                containerId={containerId}
            >
                {children}
            </ColumnLane>
        </div>
    );
};

export default SortableColumn;
