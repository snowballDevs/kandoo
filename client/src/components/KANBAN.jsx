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
import SortableTask from './SortableTask';

const KANBAN = ({boardInfo}) => {
    const {columns} = boardInfo;

    const [items, setItems] = useState(columns);
    const [activeId, setActiveId] = useState(null);
    const recentlyMovedToNewContainer = useRef(false);

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const findContainer = (id) => {
        if (id in items) {
            console.log('find container', id);
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

        console.log('Active container', activeContainer);
        console.log('Over container', overContainer);

        console.log('activecontainer ', items[activeContainer]);
        console.log('over/new container: ', items[overContainer]);

        if (!overContainer || !activeContainer) {
            console.log('No active or not over');
            return;
        }

        if (activeContainer !== overContainer) {
            console.log('Active and over not equal');
            setItems((prev) => {
                const activeItems = prev[activeContainer].tasks;
                const overItems = prev[overContainer].tasks;
                console.log(prev);
                console.log(over.id);
                console.log(activeItems);
                console.log(overItems);

                const activeIndex = activeItems.findIndex(
                    (t) => t._id === active.id
                );
                const overIndex = overItems.findIndex((t) => t._id === over.id);

                console.log(activeIndex);

                console.log(overIndex);

                let newIndex;
                if (over.id in prev) {
                    console.log(over.id);
                    console.log('Fired true');
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

        if (overContainer) {
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
        }
        setActiveId(null);
    }

    function getIds(column) {
        return column.tasks.map((task) => task._id);
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
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {/* todo: check later for index */}

                {items.map((column, i) => {
                    // <div>{column}</div>
                    return (
                        <ColumnLane
                            key={column._id}
                            id={`${i}`}
                            items={getIds(column)}
                            column={column}
                        />
                    );
                })}

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
