import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

const SortableTask = ({
    task,
    id,
    taskName,
    taskComments,
    tags,
    assignedUserIds,
    columnName,
    createdAt,
    boardId,
    columnId,
    priority,
}) => {

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
            type: 'Task',
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard
                task={task}
                taskName ={taskName}
                taskComments = {taskComments}
                tags = {tags}
                assignedUserIds = {assignedUserIds}
                columnName = {columnName}
                createdAt= {createdAt}
                boardId= {boardId}
                columnId= {columnId}
                priority= {priority}
            />

        </div>
    );
};

export default SortableTask;
