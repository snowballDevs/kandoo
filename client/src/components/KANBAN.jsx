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
    closestCorners,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import ColumnLane from './ColumnLane';
import colums from './data';
import SortableColumn from './SortableColumn';
import SortableTask from './SortableTask';

const defaultAnnouncements = {
    onDragStart(id) {
        console.log(`Picked up draggable item ${id}.`);
    },
    onDragOver(id, overId) {
        if (overId) {
            console.log(
                `Draggable item ${id} was moved over droppable area ${overId}.`
            );
            return;
        }

        console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd(id, overId) {
        if (overId) {
            console.log(
                `Draggable item ${id} was dropped over droppable area ${overId}`
            );
            return;
        }

        console.log(`Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
        console.log(
            `Dragging was cancelled. Draggable item ${id} was dropped.`
        );
    },
};

const KANBAN = () => {
    const [items, setItems] = useState(colums);
    const [activeId, setActiveId] = useState(null);
    const recentlyMovedToNewContainer = useRef(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
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

    function handleDragStart(event) {
        const {active} = event;
        const {id} = active;

        setActiveId(id);
    }

    function handleDragOver({active, over}) {
        // Find the containers
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        console.log('old container: ', items[activeContainer]);
        console.log('over/new container: ', items[overContainer]);

        if (!activeContainer || !overContainer) {
            return;
        }

        if (activeContainer !== overContainer) {
            setItems((prev) => {
                const activeItems = prev[activeContainer].tasks;
                const overItems = prev[overContainer].tasks;

                console.log(activeItems);
                console.log(overItems);

                const activeIndex = prev[activeContainer].tasks.findIndex(
                    (t) => t._id === active.id
                );
                const overIndex = prev[overContainer].tasks.findIndex(
                    (t) => t._id === over.id
                );

                console.log(activeIndex);

                console.log(overIndex);

                let newIndex;
                if (over.id in prev) {
                    // We're at the root droppable of a container
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

                // if (activeIndex !== overIndex) {
                //     console.log('Hi');
                //     setItems((prevItems) => {
                //         const updatedItems = [...prevItems]; // Create a shallow copy of the array
                //         updatedItems[overContainer].tasks = arrayMove(
                //             updatedItems[overContainer].tasks,
                //             activeIndex,
                //             overIndex
                //         );
                //         return updatedItems;
                //     });
                // }

                const updatedItems = [...prev];

                console.log('Updated items prevstate', updatedItems);

                const updatedActiveContainerTasks = prev[
                    activeContainer
                ].tasks.filter((item) => item._id !== active.id);

                console.log(
                    'Active container tasks',
                    updatedActiveContainerTasks
                );

                console.log(prev[activeContainer].tasks);
                console.log(prev[activeContainer].tasks[activeIndex]);

                const updatedOverContainerTasks = [
                    ...prev[overContainer].tasks.slice(0, newIndex),
                    prev[activeContainer].tasks[activeIndex],
                    ...prev[overContainer].tasks.slice(
                        newIndex,
                        prev[overContainer].tasks.length
                    ),
                ];

                console.log('Over container tasks', updatedOverContainerTasks);

                updatedItems[activeContainer] = {
                    ...updatedItems[activeContainer],
                    tasks: updatedActiveContainerTasks,
                };

                updatedItems[overContainer] = {
                    ...updatedItems[overContainer],
                    tasks: updatedOverContainerTasks,
                };

                console.log(updatedItems);

                return updatedItems;
            });
        }
    }

    function handleDragEnd({active, over}) {
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);
        // console.log('handleDragStart - Set Active Id to: ', activeId);

        if (!activeContainer) {
            setActiveId(null);
            return;
        }

        const overId = over?.id;

        if (overId == null) {
            setActiveId(null);
            return;
        }

        // const activeIndex = items[activeContainer].indexOf(active.id);
        // const overIndex = items[overContainer].indexOf(overId);

        const activeIndex = items[activeContainer].tasks.findIndex(
            (t) => t._id === active.id
        );
        const overIndex = items[overContainer].tasks.findIndex(
            (t) => t._id === overId
        );

        if (activeIndex !== overIndex) {
            console.log('Hi');
            setItems((prevItems) => {
                const updatedItems = [...prevItems]; // Create a shallow copy of the array
                updatedItems[overContainer].tasks = arrayMove(
                    updatedItems[overContainer].tasks,
                    activeIndex,
                    overIndex
                );
                return updatedItems;
            });
        }

        setActiveId(null);
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
                announcements={defaultAnnouncements}
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {/* todo: check later for index */}
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        {items.map((column, i) => {
                            // <div>{column}</div>
                            return (
                                <ColumnLane
                                    key={column._id}
                                    id={i}
                                    items={column.tasks}
                                    column={column}
                                />
                            );
                        })}
                    </div>
                </div>
                <DragOverlay>
                    {activeId ? renderSortableItemDragOverlay(activeId) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );

    function renderSortableItemDragOverlay(itemId) {
        console.log(itemId);
        const containerId = findContainer(itemId);
        console.log(containerId);
        const activeIndex = items[containerId].tasks.findIndex(
            (t) => t._id === itemId
        );
        const task = items[containerId].tasks[activeIndex];

        return <SortableTask task={task} dragOverlay />;
    }
};

export default KANBAN;
