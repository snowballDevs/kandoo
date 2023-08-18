import {useContext, useMemo, useState, useEffect} from 'react';
import {
    DndContext,
    //   DragEndEvent,
    //   DragOverEvent,
    DragOverlay,
    //   DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import {createPortal} from 'react-dom';
import {HiPlusCircle} from 'react-icons/hi';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import Modal from './Modal';
// import { Column, Id, Task } from "../types";
import Column from './dndcolumn';
import TaskCard from './dndtaskcard';
import dataService from '../services/dataService';

const Kanban = ({boardInfo}) => {
    const [columns, setColumns] = boardInfo.columns;
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    function onDragStart({active}) {
        setActiveColumn(active.id);
    }

    function onDragEnd({active, over}) {
        if (active.id in items && over?.id) {
            setColumns((columns) => {
                const oldColumnIndex = columns.indexOf(active.id);

                const newColumnIndex = columns.indexOf(over.id);

                return arrayMove(columns, oldColumnIndex, newColumnIndex);
            });
        }
    }

    function onDragOver(event) {
        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === 'column';

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

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
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <Column
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(
                                        (task) => task.columnId === col.id
                                    )}
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
            </DndContext>
        </div>
    );
};
