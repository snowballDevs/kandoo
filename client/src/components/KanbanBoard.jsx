import Column from './Column';
import {
    DndContext,
    // DragEndEvent,
    // DragOverEvent,
    // DragOverlay,
    // DragStartEvent,
    // PointerSensor,
    // useSensor,
    useSensors,
  } from "@dnd-kit/core";
import TaskCard from "./Task"
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {createPortal} from "react-dom"

const KanbanBoard = ({boardInfo}) => {
    const {column, tasks} = boardInfo;
    console.log(boardInfo);

    const sensors = useSensors

    return (
        <div className='flex justify-center items-center h-screen'>

                {/* // sensors={sensors}
                // onDragStart={onDragStart}
                // onDragEnd={onDragEnd}
                // onDragOver={onDragOver} */}
            <div className='flex space-x-4 text-black'>
                {/* <SortableContext items={columnName}> */}
                {categoryStages.map((column, i) => (
                    <Column key={column} columnName={column} tasks={tasks} />
                ))}
                {/* </SortableContext> */}
            </div>

        </div>
    );
};


export default KanbanBoard;
