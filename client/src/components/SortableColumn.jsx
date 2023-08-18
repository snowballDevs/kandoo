import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import ColumnLane from './ColumnLane';

const SortableColumn = ({column}) => {
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
            type: 'Column',
        },
    });

    console.log(column.tasks);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

   
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ColumnLane id={column.id} column={column} />
        </div>
    );
};

export default SortableColumn;
