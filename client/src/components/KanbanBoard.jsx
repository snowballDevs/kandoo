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
    console.log(boardInfo);

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex space-x-4 text-black'>
                {column.map((column, i) => (
                    <Column key={column} columnName={column} tasks={tasks} />
                ))}
            </div>
        </div>
    );
};


export default KanbanBoard;