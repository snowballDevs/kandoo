import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import TaskCard from './TaskCard';
import {useDndMonitor} from '@dnd-kit/core';
const SortableTask = ({task, id}) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
        over,
        overIndex,
    } = useSortable({
        id,
        data: {
            type: 'Task',
        },
    });

    // useDndMonitor({
    //     onDragStart(event) {
    //         // console.log(
    //         //     `onDragStart: container ${event.active.data.current.sortable.containerId} and index ${event.active.data.current.sortable.index} `
    //         // );
    //         console.log(event)
    //     },
    //     // onDragMove(event) {
    //     //     console.log(event);
    //     // },
    //     onDragOver(event) {
    //         console.log(event);

    //         console.log(
    //             `over: container ${event.over.data.current.sortable.containerId} and index ${event.over.data.current.sortable.index} `
    //         );
    //     },
    //     // onDragEnd(event) {
    //     //     console.log(event);
    //     // },
    //     // onDragCancel(event) {
    //     //     console.log(event);
    //     // },
    // });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard task={task} />
        </div>
    );
};

export default SortableTask;
