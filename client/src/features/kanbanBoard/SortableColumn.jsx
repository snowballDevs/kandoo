import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Column from './Column';

const SortableColumn = ({
    column,
    id,
    items,
    addTask,
    removeColumn,
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
            <Column
                column={column}
                items={items}
                addTask={addTask}
                containerId={containerId}
                removeColumn={removeColumn}
            >
                {children}
            </Column>
        </div>
    );
};

export default SortableColumn;
