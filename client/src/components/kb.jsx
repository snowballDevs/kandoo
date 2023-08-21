import {useContext, useMemo, useState, useEffect, useRef} from 'react';
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
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {createPortal} from 'react-dom';
import {HiPlusCircle} from 'react-icons/hi';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import Modal from './Modal';
// import { Column, Id, Task } from "../types";
import Column from './dndcolumn';
import TaskCard from './TaskCard';
import dataService from '../services/dataService';
import SortableColumn from './SortableColumn';
import SortableTask from './SortableTask';
import ColumnLane from './ColumnLane';
import Task from './Task';

const KB = ({boardInfo}) => {
    console.log(boardInfo);

    const {columns} = boardInfo;
    console.log(columns);
    const [activeId, setActiveId] = useState(null);
    const recentlyMovedToNewContainer = useRef(false);
    const [items, setItems] = useState(columns);
    const [containers, setContainers] = useState(Object.keys(items));

    console.log(containers);
    console.log(items);
    console.log(items[0].tasks);

    // const isSortingContainer = activeId ? containers.includes(id) : false;

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

    const findContainer = (id) => {
        if (id in items) {
            return id;
        }

        for (const [key, value] of Object.entries(items)) {
            for (const task of value.tasks) {
                if (task._id === id) {
                    return key;
                }
            }
        }

        // return Object.keys(items).find((key) => {
        //     console.log(items[key].tasks.some((task) => task._id === id));
        //     return items[key].tasks.some((task) => task._id === id);
        // });
    };

    function handleDragStart({active}) {
        setActiveId(active.id);
        console.log(activeId);
    }

    function handleDragEnd({active, over}) {
        if (active.id in items && over?.id) {
            setContainers((containers) => {
                const activeIndex = containers.indexOf(active.id);
                const overIndex = containers.indexOf(over.id);

                return arrayMove(containers, activeIndex, overIndex);
            });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
            setActiveId(null);
            return;
        }

        const overId = over?.id;

        if (overId == null) {
            setActiveId(null);
            return;
        }

        const overContainer = findContainer(overId);
        console.log(overContainer);
        console.log(activeContainer);
        console.log('hi');
        if (overContainer) {
            const activeIndex = items[activeContainer].tasks.findIndex(
                (t) => t._id === active.id
            );
            const overIndex = items[overContainer].tasks.findIndex(
                (t) => t._id === overId
            );

            if (activeIndex !== overIndex) {
                console.log(items[overContainer]);
                setItems((items) => ({
                    [overContainer]: arrayMove(
                        items[overContainer].tasks,
                        activeIndex,
                        overIndex
                    ),
                }));
            }
        }

        setActiveId(null);
    }

    function handleDragOver({active, over}) {
        const overId = over?.id;

        if (overId == null || active.id in items) {
            return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
            return;
        }

        if (activeContainer !== overContainer) {
            setItems((items) => {
                const activeItems = items[activeContainer].tasks;
                const overItems = items[overContainer].tasks;
                const overIndex = overItems.indexOf(overId);
                const activeIndex = activeItems.indexOf(active.id);

                console.log(activeItems);
                console.log(overItems);
                console.log(overIndex);
                console.log(activeIndex);

                let newIndex;

                if (overId in items) {
                    newIndex = overItems.length + 1;
                } else {
                    const isBelowOverItem =
                        over &&
                        active.rect.current.translated &&
                        active.rect.current.translated.top >
                            over.rect.top + over.rect.height;

                    const modifier = isBelowOverItem ? 1 : 0;

                    newIndex =
                        overIndex >= 0
                            ? overIndex + modifier
                            : overItems.length + 1;
                }

                recentlyMovedToNewContainer.current = true;

                return {
                    ...items,
                    [activeContainer]: items[activeContainer].tasks.filter(
                        (item) => item._id !== active.id
                    ),
                    [overContainer]: [
                        ...items[overContainer].tasks.slice(0, newIndex),
                        items[activeContainer].tasks[activeIndex],
                        ...items[overContainer].tasks.slice(
                            newIndex,
                            items[overContainer].tasks.length
                        ),
                    ],
                };
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
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
            >
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext
                            items={containers}
                            strategy={horizontalListSortingStrategy}
                        >
                            {containers.map((containerId) => (
                                <SortableColumn
                                    column={items[containerId]}
                                    key={containerId}
                                    id={containerId}
                                    items={items[containerId].tasks}
                                >
                                    <SortableContext
                                        items={items[containerId].tasks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {items[containerId].tasks.map(
                                            (task, index) => {
                                                console.log(task);
                                                return (
                                                    <SortableTask
                                                        key={task._id}
                                                        task={task}
                                                        index={index}
                                                    />
                                                );
                                            }
                                        )}
                                    </SortableContext>
                                </SortableColumn>
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
                        {activeId
                            ? containers.includes(activeId)
                                ? renderContainerDragOverlay(activeId)
                                : renderSortableItemDragOverlay(activeId)
                            : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );

    function renderContainerDragOverlay(containerId) {
        console.log(containerId);
        return (
            <ColumnLane
                column={items[containerId]}
                items={items[containerId].tasks}
            />
        );
    }

    function renderSortableItemDragOverlay(itemId) {
        console.log(itemId);
        const containerId = findContainer(itemId);
        console.log(containerId);
        const activeIndex = items[containerId].tasks.findIndex(
            (t) => t._id === itemId
        );
        const task = items[containerId].tasks[activeIndex];
        console.log(task);
        console.log(activeIndex);
        console.log(containerId);
        return <TaskCard task={task} dragOverlay />;
    }
};

export default KB;
