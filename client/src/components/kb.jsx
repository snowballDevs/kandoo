import {useContext, useMemo, useState, useEffect} from 'react';
import {
    DndContext,
    //   DragEndEvent,
    //   DragOverEvent,
    DragOverlay,
    //   DragStartEvent,
    PointerSensor,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    closestCenter,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {createPortal} from 'react-dom';
import {HiPlusCircle} from 'react-icons/hi';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import Modal from './Modal';
// import { Column, Id, Task } from "../types";
import Column from './dndcolumn';
import TaskCard from './dndtaskcard';
import dataService from '../services/dataService';
import SortableColumn from './SortableColumn';
import SortableTask from './SortableTask';

const KB = ({boardInfo}) => {
    console.log(boardInfo);
    const [columns, setColumns] = useState(boardInfo.columns);
    const [activeId, setActiveId] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    console.log(activeId);

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const pointerSensor = useSensor(PointerSensor);
    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
        pointerSensor
    );

    function onDragStart({active}) {
        setActiveId(active.id);
        console.log(activeId);
    }

    function handleDragEnd({active, over}) {
        if (active.id !== over.id) {
            setColumns((columns) => {
                const oldIndex = columns.indexOf(active.id);
                const newIndex = columns.indexOf(over.id);
                return arrayMove(columns, oldIndex, newIndex);
            });
        }
    }

    // function onDragOver(event) {
    //     const {active, over} = event;
    //     if (!over) return;

    //     const activeId = active.id;
    //     const overId = over.id;

    //     if (activeId === overId) return;

    //     const isActiveATask = active.data.current?.type === 'Task';
    //     const isOverATask = over.data.current?.type === 'Task';

    //     if (!isActiveATask) return;

    //     if (isActiveATask && isOverATask) {
    //         setTasks((tasks) => {
    //             const activeIndex = tasks.findIndex((t) => t.id === activeId);
    //             const overIndex = tasks.findIndex((t) => t.id === overId);

    //             tasks[activeIndex].columnId = tasks[overIndex].columnId;

    //             return arrayMove(tasks, activeIndex, overIndex);
    //         });
    //     }

    //     const isOverAColumn = over.data.current?.type === 'column';

    //     if (isActiveATask && isOverAColumn) {
    //         setTasks((tasks) => {
    //             const activeIndex = tasks.findIndex((t) => t.id === activeId);

    //             tasks[activeIndex].columnId = overId;

    //             return arrayMove(tasks, activeIndex, activeIndex);
    //         });
    //     }
    // }

    return (
        <div
            className='
      m-auto 
      flex 
      min-h-screen 
      w-full 
      items-center 
      overflow-x-auto 
      overflow-y-hidden 
      px-[40px]
      bg-tertiaryLight
      '
        >
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
            >
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext
                            items={columns}
                            strategy={horizontalListSortingStrategy}
                        >
                            {columns.map((column) => (
                                <SortableColumn
                                    column={column}
                                    key={column.id}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => {
                            createNewColumn();
                        }}
                        className='
                                h-[60px]
                                w-[350px]
                                min-w-[350px]
                                cursor-pointer
                                rounded-lg
                                border-2
                                border-columnBackgroundColor
                                p-4
                                ring-pinkLight
                                hover:ring-2
                                flex
                                gap-2
                            '
                    >
                        <HiPlusCircle />
                        Add Column
                    </button>
                </div>
                {createPortal(
                    <DragOverlay>
                        {activeId ? (
                            columns.includes(activeId) ? (
                                <SortableColumn value={activeId} />
                            ) : (
                                <SortableTask value={activeId} />
                            )
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
};

export default KB;
